const fs = require("fs");
const path = require("path");
const hb = require("handlebars");
const beautify = require('js-beautify').js_beautify;
const partialLoader = require("./PartialLoader");
const cm = require("../domain/ConcreteModel");

const oclFileSuffix = "-ocl-constraints"

const expressionTemplate = hb.compile("{{> expression }}", {preventIndent: true});
const ruleTemplate = hb.compile("{{> rule }}");
const oclFileTemplate = hb.compile("{{> ocl-rule-definition-file }}", {preventIndent: true});

function initTemplates() {
    console.log("Loading templates...");
    partialLoader.initTemplates();
    console.log("Loading templates done.");
}

function replaceMetaCharacters(input) {
    output = input.replace(/[\t\r\n]/g, "");
    output = output.replace(/&lt;/g, "<");
    output = output.replace(/&gt;/g, ">");
    output = output.replace(/&quot;/g, "'");
    output = output.replace(/&nbsp;/g, " ");
    return output;
}

function processExpression(exprAst) {
    let output =  expressionTemplate(exprAst);
    output = replaceMetaCharacters(output);
    return output;
}
function generateCodeForRule(ruleAst, contextParams) {
    let output = processExpression(ruleAst);

    contextParams.condition = output;
    output = ruleTemplate(contextParams);
    output = beautify(output, { indent_size: 4 });
    return output;
}

function processInvariants(classElement) {
    for(let i = 0; i < classElement.invariants.length; i++) {
        let rule = classElement.invariants[i];
        let source = generateCodeForRule(rule.ruleBody, {
            ruleName: rule.ruleName,
            ruleType: "inv",
            className: classElement.className,
            methodName: null
        });
        classElement.invariants[i] = source;
    }
}

function processPreconditions(classElement) {
    for(let operation of classElement.operations) {
        let ruleList = operation.preconditions;
        for(let i = 0; i < ruleList.length; i++) {
            let rule = ruleList[i];
            let source = generateCodeForRule(rule.ruleBody, {
                ruleName: rule.ruleName,
                ruleType: "pre",
                className: classElement.className,
                methodName: operation.operationName
            });
            ruleList[i] = source;
        }
    }
}

function processPostconditions(classElement) {
    for(let operation of classElement.operations) {
        let ruleList = operation.postconditions;
        for(let i = 0; i < ruleList.length; i++) {
            let rule = ruleList[i];
            let source = generateCodeForRule(rule.ruleBody, {
                ruleName: rule.ruleName,
                ruleType: "post",
                className: classElement.className,
                methodName: operation.operationName
            });
            ruleList[i] = source;
        }
    }
}

function processOclBody(classElement) {
    for(let i = 0; i < classElement.oclBodyConstraints.length; i++) {
        let body = classElement.oclBodyConstraints[i];
        let source = processExpression(body.expression.ruleBody);
        source = beautify(source, { indent_size: 4 });
        body.expression = source;
    }
}

function processOclDerive(classElement) {
    for(let i = 0; i < classElement.oclDeriveConstraints.length; i++) {
        let derive = classElement.oclDeriveConstraints[i];
        let source = processExpression(derive.expression.ruleBody);
        source = beautify(source, { indent_size: 4 });
        derive.expression = source;
    }
}

function processRulesForClass(classElement) {
    processInvariants(classElement);
    processPreconditions(classElement);
    processPostconditions(classElement);
    processOclBody(classElement);
    processOclDerive(classElement);
}

function generateOclDefinitionFile(classElement) {
    processRulesForClass(classElement);
    var output =  oclFileTemplate(classElement);
    output = beautify(output, { indent_size: 4 });
    return output;
}

function generateCodeForClass(classElement, outputDir, fileExtension) {
    let fileContent = generateOclDefinitionFile(classElement);
    let filePath = path.join(outputDir, classElement.filePath + oclFileSuffix + fileExtension);
    console.log(filePath);
    fs.writeFileSync(filePath, fileContent);
}

function createDirectoryIfNotExists(outputDir, pathElements) {
    let directoryPath = path.join(outputDir, ...pathElements);
    console.log(directoryPath);
    if(! fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}

function generateCode(cmModel, outputDir, fileExtension) {
    cmModel.classes.every(  (classElement) => {
        createDirectoryIfNotExists(outputDir, classElement.packagePath);
        generateCodeForClass(classElement, outputDir, fileExtension);
        return true;
    });
}

module.exports = {
    initTemplates: initTemplates,
    generateCode: generateCode,
}