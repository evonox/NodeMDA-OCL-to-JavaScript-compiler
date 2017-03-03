// TODO Traverse Builtin (both collection and primitive type) function arguments and navigation functions
class TraverseAstTree {

    traverse(ast, handlers) {
        this.traverseContexts(ast, handlers);
    }

    traverseContexts(ast, handlers) {   
        ast.every( (astChildNode) => {
            if(astChildNode.type === "package") {
                this.invokeBeginPackageHandler(astChildNode, handlers);
                this.traverseContexts(astChildNode.contexts, handlers);
                this.invokeEndPackageHandler(astChildNode, handlers);
            } else if(astChildNode.type === "context") {
                this.processContext(astChildNode, handlers)
            } else {
                throw new Error(`Unknown node element in OCL structure with type '${astChildNode.type}`);
            }
            return true;
        });
    }

    processContext(ast, handlers) {
        this.invokeBeginContextHandler(ast, handlers);
        this.traverseRules(ast.rules, handlers);
        this.invokeEndContextHandler(ast, handlers);
    }

    traverseRules(ast, handlers) {
        ast.every( (rule) => {
            this.tranverseRuleExpression(rule.ruleBody, handlers);
            return true;
        });
    }

    tranverseRuleExpression(ast, handlers) {
        if(ast.operator !== undefined) {
            this.processOperator(ast, handlers);
        } else if(ast.termType !== undefined) {
            this.processTerminalNode(ast, handlers);
        } else {
            throw new Error("Undefined node in rule OCL expression.");
        }
    }

    processOperator(ast, handlers) {
        if(ast.left !== undefined && ast.left !== null) {
            this.tranverseRuleExpression(ast.left, handlers);
        }
        this.invokeNonTerminalNodeHandler(ast, handlers);
        if(ast.right !== undefined && ast.right !== null) {
            this.tranverseRuleExpression(ast.right, handlers);
        }
    }

    processTerminalNode(ast, handlers) {
        if(ast.termType === "navigation" && ast.args !== null) {
            this.processArguments(ast.args, handlers);
        } else if(ast.termType === "builtInFunction" || ast.tertType === "collectionFunction") {
            this.processBuiltInFunction(ast, handlers);
        }
        this.invokeTerminalNodeHandler(ast, handlers);
    }

    processBuiltInFunction(ast, handlers) {
        let args = [ast.firstArgument].concat(ast.args === null ? [] : ast.args);
        this.processArguments(args, handlers);
    }

    processArguments(args, handlers) {
        args.every( (argument) => {
            this.tranverseRuleExpression(argument, handlers);
        });
    }

    invokeBeginPackageHandler(ast, handlers) {
        if(handlers.beginPackage !== undefined) {
            handlers.beginPackage(ast);
        }
    }

    invokeEndPackageHandler(ast, handlers) {
        if(handlers.endPackage !== undefined) {
            handlers.endPackage(ast);
        }
    }

    invokeBeginContextHandler(ast, handlers) {
        if(handlers.beginContext !== undefined) {
            handlers.beginContext(ast);
        }
    }

    invokeEndContextHandler(ast, handlers) {
        if(handlers.endContext !== undefined) {
            handlers.endContext(ast);
        }
    }

    invokeNonTerminalNodeHandler(ast, handlers) {
        if(handlers.nonTerminalNode !== undefined) {
            handlers.nonTerminalNode(ast);
        }
    }

    invokeTerminalNodeHandler(ast, handlers) {
        if(handlers.terminalNode !== undefined) {
            handlers.terminalNode(ast);
        }
    }
}

class TraversalProcessLogger {
    log(ast) {
        new TraverseAstTree().traverse(ast, {
            beginPackage: (ast) => {
                console.log("Begin package: " + ast.path.join("::"));                
            },
            endPackage: (ast) => {
                console.log("End package: " + ast.path.join("::"));                
            },
            beginContext: (ast) => {
                console.log("Begin context: " + ast.contextHeading.elementPath.join("::"));
            },
            endContext: (ast) => {
                console.log("End context: " + ast.contextHeading.elementPath.join("::"));                
            },
            terminalNode: (ast) => {
                console.log("Terminal Node: " + ast.termType);
            },
            nonTerminalNode: (ast) => {
                console.log("Non-terminal Node: " + ast.operator);
            }

        });
    }
}

module.exports = {

    traverse: function(ast, handlers) {
        new TraverseAstTree().traverse(ast, handlers);
    },

    logProcess: function(ast) {
        new TraversalProcessLogger().log(ast);
    }
}