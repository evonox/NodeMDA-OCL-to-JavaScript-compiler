/*
    Parser grammar for OCL by Viktor Prehnal
    Licence: MIT
*/

{
    function attachLeft(left, term) {
        if(term === null) {
            return left;
        }  else { 
            term.left = left; 
            return term; 
        }
    }

    function binOp(operatorName, term, subtree) {
        var right = term;
        if(subtree !== null) {
            subtree.left = term;
            right = subtree;
        } 
        return {
            operator: operatorName,
            left: undefined,
            right: right
        };
    }
}

OCL = _ data:( package / context )+ { return data; }

package = kwPackage path:elementPath contexts:context+ kwEndPackage {
    return {
        type: "package",
        path: path,
        contexts: contexts
    }
}

elementPath = first:identifier other:( opDoubleColon data:identifier { return data; } )* _
{ return [first].concat(other);  }

context = context:contextHeading rules:oclRule+ {
    return {
        type: "context",
        contextHeading: context,
        rules: rules
    }
}

contextHeading = kwContext /*name:contextName?*/ path:elementPath operationDeclaration:operationDeclaration? { 
    return { 
        //contextName: name, 
        elementPath: path,
        operationDeclaration: operationDeclaration
    }
}

operationDeclaration = params:( opLParen params:parameterList? opRParen { return params; } )? opColon returnType:identifier {
    return {
        parameters: params === null ? [] : params,
        returnType: returnType
    }
}

parameterList = first:paramDeclaration other:( opComma param:paramDeclaration { return param; })* {
    return [first].concat(other);
}

paramDeclaration = paramName:identifier opColon paramType:identifier {
    return {
        parameterName: paramName,
        parameterType: paramType
    }
}

contextName = contextName:identifier opColon { return contextName; }

oclRule = ruleType:oclRuleType ruleName:identifier? opColon ruleBody:oclRuleBody {
    return {
        ruleName: ruleName === null ? "": ruleName,
        ruleType: ruleType,
        ruleBody: ruleBody
    }
}

oclRuleType = kwPrecondition / kwPostcondition / kwInvariant / kwBody / kwDerive

oclRuleBody = oclExpression

/*
    OCL EXPRESSION RULES
*/

oclExpression = nsExpr0

nsExpr0 = left:nsExpr1 term:nsExpr0_ { return attachLeft(left, term); }
nsExpr0_ = opImplies term:nsExpr1 { return binOp("implies", term, null); }
        / nsExpr1?

nsExpr1 = left:nsExpr2 term:nsExpr1_ { return attachLeft(left, term); }
nsExpr1_ = 
    opAnd term:nsExpr2 { return binOp("and", term, null); }
    / opOr term:nsExpr2 { return binOp("or", term, null); }
    / opXor term:nsExpr2 { return binOp("xor", term, null); }
    / nsExpr2?

nsExpr2 = left:nsExpr3 term:nsExpr2_ { return attachLeft(left, term); }
nsExpr2_ = opEqual term:nsExpr3 { return binOp("equal", term, null); }
        / opNotEqual term:nsExpr3 { return binOp("notEqual", term, null); }
        / nsExpr3?

nsExpr3 = left:nsExpr3a term:nsExpr3_ { return attachLeft(left, term); }
nsExpr3_ = !(opNotEqual) opLess term:nsExpr3a { return binOp("less", term, null); }
        / opGreater term:nsExpr3a { return binOp("greater", term, null); }
        / opLessOrEqual term:nsExpr3a { return binOp("lessOrEqual", term, null); }
        / opGreaterOrEqual term:nsExpr3a { return binOp("greaterOrEqual", term, null); }
        / nsExpr3a?

nsExpr3a = kwIf condition:oclExpression kwThen thenExpr:oclExpression kwElse elseExpr:oclExpression kwEndIf
    {
        return {
            operator: "if",
            condition: condition,
            thenExpression: thenExpr,
            elseExpression: elseExpr
        }
    }
    / nsExpr4?

nsExpr4 = 
    opMinus leftTerm:nsExpr7 term:nsExpr4_ { 
        var left = { operator: "negate", "left": leftTerm };
        if(term === null)  return left; else { term.left = left; return term; }
    }
    / left:nsExpr5 term:nsExpr4_ { return attachLeft(left, term); }


nsExpr4_ = opPlus term:nsExpr5 subtree:nsExpr4_ { return binOp("add", term, subtree); }
        / opMinus term:nsExpr5 subtree:nsExpr4_ { return binOp("sub", term, subtree); }
        / nsExpr5?

nsExpr5 = left:nsExpr6 term:nsExpr5_ { return attachLeft(left, term); }
nsExpr5_ = opMult term:nsExpr6 subtree:nsExpr5_ { return binOp("mult", term, subtree); }
        / opDiv term:nsExpr6 subtree:nsExpr5_ { return binOp("div", term, subtree); }
        / nsExpr6?

nsExpr6 = opNot left:nsExpr7 { return { operator: "not", left: left }; }
        / opLParen opMinus left:nsExpr7 opRParen { return { operator: "negate", left: left }; }
        / nsExpr7

nsExpr7 = opLParen left:oclExpression opRParen builtInFunction:builtInFunctionChain? { 
            var term = {
                operator: "parenthesis",
                left: left
            }
            if(builtInFunction !== null) {
                builtInFunction.first.firstArgument = term;
                term =  builtInFunction.last;
            }
            return term;
        }
        / term:expressionLiteral builtInFunction:builtInFunctionChain? {
            if(builtInFunction !== null) {
                builtInFunction.first.firstArgument = term;
                term = builtInFunction.last;
            }
            return term;
        }

expressionLiteral = data:( number / stringInQuotes / stringInDoubleQuotes /  kwTrue / kwFalse / navigation ) _ { return data; }

/*
    BUILT-IN FUNCTIONS
*/

builtInFunctionChain = &((opDot builtInFunctionNames)/ (opSlimArrow collectionFunctionNames)) 
                        functions:(builtInFunction  / collectionFunction)+ 
{
    for(let i = 1; i < functions.length; i++) {
        functions[i].firstArgument = functions[i - 1];
    }
    return {
        first: functions[0],
        last: functions[functions.length - 1]
    };
}


builtInFunction = opDot functionName:builtInFunctionNames args:methodArguments {
    return {
        firstArgument: null,
        termType: "builtInFunction",
        builtInFunction: functionName,
        args: args
    }
}


collectionFunction = opSlimArrow functionName:collectionFunctionNames args:methodArguments {
    return {
        firstArgument: null,
        termType: "collectionFunction",
        builtInFunction: functionName,
        args: args
    }
}

builtInFunctionNames = functionName:( "oclIsUndefined" / "mod" / "div" / "abs"/ "max" / "min" / "round" / "floor" 
                                        / "concat"/ "size"/ "toLower"  / "toUpper" / "toInteger" / "toReal" 
                                        / "substring") { return functionName; }

collectionFunctionNames = functionName:( "asSet" / "asOrderedSet" / "asBag" / "asSequence" / "flatten" 
                                        / "includesAll" / "excludesAll" / "isEmpty" / "notEmpty" 
                                        / "size" / "sum" / "count" / "includes" / "excludes" 
                                        / "first" / "last"/ "at" / "indexOf" 
                                        / "union" / "intersection" / "symmetricDifference" 
                                        / "including" / "excluding" / "subSequence" / "subOrderedSet" 
                                        / "append" / "prepend" / "insertAt") { return functionName; }

/*
    NAVIGATION RULES
*/

navigation = self:(kwSelf opDot)? path:navigationPath args:methodArguments? { 
    return {
        termType: "navigation",
        pathElements: path,
        args: args,
        pathType: self === null ? undefined : "attribute"
     }
}
    / kwSelf {
        return {
            termType: "navigation",
            pathElements: [],
            args: [],
            pathType: "instance"
        }
    }

navigationPath = first:identifier other:( opDot data:identifier { return data; } )* {
    return [first].concat(other);
}

methodArguments = opLParen args:argumentList? opRParen { return args === null ? [] : args; }

argumentList = first:oclExpression other:( opComma expr:oclExpression { return expr; } )* {
    return [first].concat(other);
}

/*
    KEYWORDS
*/

keyword = opNot / opAnd / opOr / opXor / opImplies / kwContext / kwEndPackage / kwPackage / kwTrue
        / kwFalse / kwSelf / kwPrecondition / kwPostcondition / kwInvariant / kwBody / kwDerive 
        / kwIf / kwThen / kwElse / kwEndIf

kwIf = "if" _

kwThen = "then" _

kwElse = "else" _

kwEndIf = "endif" _

kwPackage = "package" _

kwEndPackage = "endpackage" _

kwContext = "context" _

kwPrecondition = "pre"  _  { return "pre"; }

kwPostcondition = "post"  _ { return "post"; }

kwInvariant = "inv" _ { return "inv"; }

kwBody = "body" _ { return "body"; }

kwDerive = "derive" _ { return "derive"; }

kwSelf = "self"

kwTrue = "true" _ { return { termType: "true" }}

kwFalse = "false" _ { return { termType: "false"}}

/*
    OPERATORS
*/

operator = opArrow / opNot / opMult / opDiv / opMinus / opPlus / opLess / opGreater / opLessOrEqual 
        / opGreaterOrEqual / opEqual / opNotEqual / opAnd / opOr / opXor / opImplies / opDoubleColon
        / opColon / opSlimArrow

opSlimArrow = "->" _

opComma = "," _

opDoubleColon = "::"

opColon = ":" _

opPrevValue = "@pre" _

opDot = "."

opArrow = "->" _

opNot = "not" _

opMult = "*" _

opDiv = "/" _

opMinus = "-" _

opPlus = "+" _ 

opLess = "<" _

opGreater = ">" _

opLessOrEqual = "<=" _

opGreaterOrEqual = ">=" _

opEqual = "=" _

opNotEqual = "<>" _

opAnd = "and" _

opOr = "or" _

opXor = "xor" _

opImplies = "implies" _

opLParen = "(" _

opRParen = ")" _

/*
    OTHER LEXICAL ELEMENTS
*/

stringInQuotes = "'" value:[^']* "'" { 
    return {
        termType: "stringInQuotes",
        value: value.join("")
    }
}

stringInDoubleQuotes = "\"" value:[^"]* "\"" { 
        return {
            termType: "stringInDoubleQuotes",
            value: value.join("")
        }
}
 
number = wholePart:digit+ decimalPart:( "."  decimalPart:digit+ { return decimalPart.join(""); } )? { 
    var number = wholePart.join("");
    if(decimalPart !== null) {
        number += "." + decimalPart;
    }
    return {
        termType: "number",
        value: number
    }
}

reservedWords = keyword / builtInFunctionNames / opSlimArrow collectionFunctionNames

identifier = !(reservedWords) first:letter other:(digit / letter)* _
{ return first + other.join(""); }

letter = [A-Za-z_]

digit = [0-9]

_ = [ \n\r\t]*