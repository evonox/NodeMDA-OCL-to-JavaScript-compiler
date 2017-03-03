const traversalHelper = require("../../helper/AstTraversalHelper")

class NavigationTypeResolver {

    constructor() {
        this._parameterNames = new Array();
    }
    
    resolve(ast) {
        let handlers = {
            beginContext: (ast) => {
                this._parameterNames = new Array();
                let operationDec = ast.contextHeading.operationDeclaration;
                if(operationDec !== null) {
                    operationDec.parameters.every( (param) => {
                        this._parameterNames.push(param.parameterName);
                        return true;
                    });
                }
            },
            terminalNode: (ast) => {
                if(ast.termType === "navigation") {
                    this.resolveNavigation(ast);
                }
            }

        };

        traversalHelper.traverse(ast, handlers);
    }

    resolveNavigation(ast) {
        if(ast.pathElements.length === 0)
            throw new Error("Empty navigation is not allowed.");
        let firstPathElement = ast.pathElements[0];
        if(this._parameterNames.indexOf(firstPathElement) >= 0) {
            if(ast.pathType === undefined) {
                ast.pathType = "parameter";
            }
        } else {
            ast.pathType = "attribute";
        }
    }
}


module.exports = {
    process: function(ast) {
        new NavigationTypeResolver().resolve(ast);
    }  
}