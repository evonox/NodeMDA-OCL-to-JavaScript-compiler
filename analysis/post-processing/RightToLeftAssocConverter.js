const traversalHelper = require("../../helper/AstTraversalHelper")

/*
    TODO: Add special handling for
        1. Let..In expressions
        2. Call expresssion with arguments if not handled by traversal method, needs to do cloning
        3. Variable Assignment
        4. Loop Expressions
        5. MUST PARSE ALL NODES IN RULE EXPRESSION DUE TO CREATING A NEW TREE STRUCTURE
        6. Add handlers BeginArgument, EndArgument, BeginMethod, EndMethod
*/
// performs the right-to-left association conversion of operators
class RightToLeftAssocConverter {

    constructor() {
        this.nodeQueue = new Array();
        this.processedNodes = new Array();
    }

    convert(ruleAst) {
        this.prepareNodeQueue(ruleAst);
        let result = this.doConversion();
        return result;
    }

    doConversion() {
        let tree = this.getNextNode();
        if(this.isUnaryOperator(tree)) {
            tree.left = doConversion();
        }
        while(true) {
            let operator = this.getNextNode();
            if(operator === undefined)
                break;
            operator = this.cloneObject(operator);
            let isPrecedence = this.isPrecedence();
            operator.left = tree;
            if(isPrecedence) {
                operator.right = this.doConversion();
            } else {
                let right = getNextNode();
                if(this.isUnaryOperator(right)) {
                    right.left = this.doConversion();
                }
                operator.right = right;
            }
            tree = operator;
        }
        return tree;
    }

    isPrecedence() {
        let lastNode = getLastNode();
        if(lastNode === undefined) return false;
        if(! this.isOperator(lastNode)) return false;
        if(this.isUnaryOperator(lastNode)) return true;
        return isOperator(lastNode.left);
    }

    cloneObject(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    isOperator(node) {
        retur node.operator !== undefined;
    }

    isUnaryOperator(astNode) {
        return astNode.right === undefined;
    }

    getLastNode() {
        if(this.processedNodes.length === 0) return undefined;
        else return this.processedNodes[this.processedNodes.length - 1];
    }

    getNextNode() {
        if(this.nodeQueue.length === 0) return undefined;
        else {
            let node = this.nodeQueue.unshift();
            this.processedNodes.push(node);
            return node;
        } 
    }

    prepareNodeQueue(ruleAst) {
        let handlers {
            terminalNode: (ast) => {
                this.nodeQueue.push(ast);
            },
            nonTerminalNode: (ast) => {
                this.nodeQueue.push(ast);
            }
        }
        traversalHelper.traverse(ast, handlers);
    }
}

// traverses all rules
class ConverterFacade {
    convert(ast) {
        let handlers = {
            beginContext: (ast) => {
                ast.rules.every( (rule) => {
                    rule.ruleBody = new RightToLeftAssocConverter().convert(rule.ruleBody);
                    return true;
                });
            }            
        }
        traversalHelper.traverse(ast, handlers);
    }
}

module.exports = {
    convert: function(ast) {
        new ConverterFacade().convert(ast);
    }
}