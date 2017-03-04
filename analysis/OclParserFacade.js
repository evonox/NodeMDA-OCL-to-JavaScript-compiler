const fs = require("fs");
const parserEngine = require("./parser/OclParser");
const postProcess = require("./post-processing/AstPostProcessing");
const am = require("../domain/AbstractModel");
const astTraversalHelper = require("../helper/AstTraversalHelper");

class Parser {

    parseOclSource(oclSource) {
        let ocl = this.stripComments(oclSource);
        let ast = parserEngine.parse(ocl);
        return ast;
    }

    stripComments(ocl) {
        ocl = ocl.replace(/[ \t]*--.*[ \t]*[\r\n]/g, "");
        ocl = ocl.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, "");
        return ocl;
    }
}

class AbstractModelBuilder {

    constructor() {
        this.amModel = new am.Model();
        this.parentElements = new Array();
    }

    getModel() { return this.amModel; }

    buildAbstractModel(ast) {
        let handlers = {
            beginPackage: (ast) => {
                let parentElement = this.getLatestParentElement();
                let umlElement = parentElement.createElement(ast.path);
                this.pushParentElement(umlElement);
            },

            endPackage: (ast) => {
                this.popParentElement();
            },

            beginContext: (ast) => {
                let parentElement = this.getLatestParentElement();
                let umlElement = parentElement.createElement(ast.contextHeading.elementPath);
                this.processParams(umlElement, ast.contextHeading.operationDeclaration);
                this.processRules(umlElement, ast.rules);
            }
        }

        this.pushParentElement(this.amModel);
        astTraversalHelper.traverse(ast, handlers);
        this.popParentElement();
    }

    processParams(umlElement, operationDeclaration) {
        if(operationDeclaration === null || operationDeclaration === undefined)
            return;
        operationDeclaration.parameters.every( (param) => {
            umlElement.addOperationParam(param);
            return true;
        });
    }

    processRules(umlElement, rules) {
        rules.every( (rule) => {
            this.processRule(umlElement, rule);
            return true;
        });
    }

    processRule(umlElement, rule) {
        switch(rule.ruleType) {
            case "pre":
                umlElement.addPreCondition(rule);
                break;
            case "post":
                umlElement.addPostCondition(rule);
                break;
            case "inv":
                umlElement.addInvariant(rule);
                break;
            case "body":
                umlElement.addBodyConstraint(rule);
                break;
            default:
                throw new Error("Unknown rule type in AbstractModelBuilder.");
        }
    }

    pushParentElement(parentElement) {
        this.parentElements.push(parentElement);
    }

    popParentElement(parentElement) {
        this.parentElements.pop();
    }

    getLatestParentElement() {
        return this.parentElements[this.parentElements.length - 1];
    }
}

module.exports = {
    parse: function(oclSource, logAstTree = false) {
        console.log("Starting parsing OCL...");

        let parser = new Parser();
        let modelBuilder = new AbstractModelBuilder();

        let ast = parser.parseOclSource(oclSource);
        postProcess.process(ast);

        if(logAstTree) {
            astInString = JSON.stringify(ast, null, 4);
            fs.writeFileSync("ast.txt", astInString);
        }

        modelBuilder.buildAbstractModel(ast);
        console.log("OCL parsing done.");
        return modelBuilder.getModel();
    }
}