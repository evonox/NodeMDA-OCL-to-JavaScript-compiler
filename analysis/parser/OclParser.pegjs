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

elementPath = first:simpleName other:( opDoubleColon data:simpleName { return data; } )* _
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

operationDeclaration = params:( opLParen params:parameterList? opRParen { return params; } )? opColon returnType:simpleName {
    return {
        parameters: params === null ? [] : params,
        returnType: returnType
    }
}

parameterList = first:paramDeclaration other:( opComma param:paramDeclaration { return param; })* {
    return [first].concat(other);
}

paramDeclaration = paramName:simpleName opColon paramType:simpleName {
    return {
        parameterName: paramName,
        parameterType: paramType
    }
}

contextName = contextName:simpleName opColon { return contextName; }

oclRule = ruleType:oclRuleType ruleName:simpleName? opColon ruleBody:oclRuleBody {
    return {
        ruleName: ruleName === null ? "": ruleName,
        ruleType: ruleType,
        ruleBody: ruleBody
    }
}

oclRuleType = kwPrecondition / kwPostcondition / kwInvariant / kwBody / kwDerive

oclRuleBody = oclExpression

oclExpression = nsOperatorExpression

/*
    OCL OPERATOR EXPRESSION RULES
*/

nsOperatorExpression = nsExpr0

nsExpr0 = left:nsExpr1 term:nsExpr_0 { return attachLeft(left, term); }
nsExpr_0 = opImplies term:nsExpr1 { return binOp("implies", term, null); }
        / nsExpr1?

nsExpr1 = left:nsExpr2 term:nsExpr_1 { return attachLeft(left, term); }
nsExpr_1 = opXor term:nsExpr2 { return binOp("xor", term, null); }
        / nsExpr2?

nsExpr2 = left:nsExpr3 term:nsExpr_2 { return attachLeft(left, term); }
nsExpr_2 = opOr term:nsExpr3 { return binOp("or", term, null); }
        / nsExpr3?

nsExpr3 = left:nsExpr4 term:nsExpr_3 { return attachLeft(left, term); }
nsExpr_3 = opAnd term:nsExpr4 { return binOp("and", term, null); }
        / nsExpr4?

nsExpr4 = left:nsExpr5 term:nsExpr_4 { return attachLeft(left, term); }
nsExpr_4 = opEqual term:nsExpr5 { return binOp("equal", term, null); }
        / opNotEqual term:nsExpr5 { return binOp("notEqual", term, null); }
        / nsExpr5?

nsExpr5 = left:nsExpr6 term:nsExpr_5 { return attachLeft(left, term); }
nsExpr_5 = !(opNotEqual) opLess term:nsExpr6 { return binOp("less", term, null); }
        / opGreater term:nsExpr6 { return binOp("greater", term, null); }
        / opLessOrEqual term:nsExpr6 { return binOp("lessOrEqual", term, null); }
        / opGreaterOrEqual term:nsExpr6 { return binOp("greaterOrEqual", term, null); }
        / nsExpr6?

nsExpr6 = 
    opMinus leftTerm:nsExpr9 term:nsExpr_6 { // TODO Complete last Expr 
        var left = { operator: "negate", "left": leftTerm };
        if(term === null)  return left; else { term.left = left; return term; }
    }
    / left:nsExpr7 term:nsExpr_6 { return attachLeft(left, term); }

nsExpr_6 = opPlus term:nsExpr7 subtree:nsExpr_6 { return binOp("add", term, subtree); }
        / opMinus term:nsExpr7 subtree:nsExpr_6 { return binOp("sub", term, subtree); }
        / nsExpr7?

nsExpr7 = left:nsExpr8  term:nsExpr_7 { return attachLeft(left, term); }
nsExpr_7 = opMult term:nsExpr8 subtree:nsExpr_7 { return binOp("mult", term, subtree); }
        / opDiv term:nsExpr8 subtree:nsExpr_7 { return binOp("div", term, subtree); }
        / nsExpr8?

nsExpr8 = opNot left:nsExpr9 { return { operator: "not", left: left }; }
        / opLParen opMinus left:nsExpr9 opRParen { return { operator: "negate", left: left }; }
        / nsExpr9

nsExpr9 = callExpression
        / nsExpr10

nsExpr10 = nsExpr11 // TODO: Preparing for @pre keyword support

nsExpr11 = letExpression
        / nsExpr12

nsExpr12 = data:( literal / variableExpression / nsParenthisExpression / nsIfExpression / navigation ) _    
{ return data; }

nsIfExpression = kwIf condition:oclExpression kwThen thenExpr:oclExpression kwElse elseExpr:oclExpression kwEndIf
    {
        return {
            operator: "if",
            condition: condition,
            thenExpression: thenExpr,
            elseExpression: elseExpr
        }
    }

// TODO - Is Function Chain necessary????? It might be expressed in callExpression
nsParenthisExpression = opLParen left:oclExpression opRParen {
    return {
        operator: "parenthesis",
        left: left
    }
}

    /*builtInFunction:builtInFunctionChain? { 
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
        / term:oclExpression builtInFunction:builtInFunctionChain? {
            if(builtInFunction !== null) {
                builtInFunction.first.firstArgument = term;
                term = builtInFunction.last;
            }
            return term;
        }*/


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

navigationPath = first:simpleName other:( opDot data:simpleName { return data; } )* {
    return [first].concat(other);
}

methodArguments = opLParen args:argumentList? opRParen { return args === null ? [] : args; }

argumentList = first:oclExpression other:( opComma expr:oclExpression { return expr; } )* {
    return [first].concat(other);
}

variableExpression = kwSelf / simpleName

/*
    Call expression - TODO Complete for FeatureCalls
*/

callExpression = featureCall / loopExpression
featureCall = "TODO"

/*
    Loop expressions - TODO - complete
*/

loopExpression = iteratorExpression  / iterateExpression

iteratorExpression = nsExpr12 opSlimArrow simpleName opLParen iteratee opRParen

iteratee = ( variableDeclaration? (opComma variableDeclaration)? opVerticalLine )? oclExpression

iterateExpression = nsExpr12  opSlimArrow "iterate" opLParen (variableDeclaration opSemiColon )?
            variableDeclaration opVerticalLine oclExpression opRParen

/*
    Let expression
*/

letExpression = kwLet first:variableDeclaration other:letExpressionSub {
    return {
        termType: "let", 
        letExprElements: [first].concat(other)
    }
}

letExpressionSub = (opComma first:variableDeclaration other:letExpressionSub) { return [first].concat(other) } 
                    / (kwIn expression:oclExpression) { return expression; }

/*
    OCL LITERALS
*/

literal = literal:(primitiveLiteral / tupleLiteral / collectionLiteral / typeLiteral / enumLiteral) {
    literal.termType = "literal";
    return literal;
}

enumLiteral = enumName:pathName opDoubleColon value:simpleName {
    return {
        literalType: "enumeration",
        enumName: enumName,
        value: value
    }
}

typeLiteral = typeDefinition:typeDefinition {
    return {
        literalType: "type",
        typeDefinition: typeDefinition
    }
}

collectionLiteral = collectionType:collectionTypeIdent opLBrace items:collectionLiteralParts? opRBrace {
    return {
        literalType: "collection",
        collectionType: collectionType,
        items: items
    }
}

collectionLiteralParts = first:colletionLiteralPart other:( opComma part:colletionLiteralPart { return part; })* {
    return [first].concat(other);
}

colletionLiteralPart = collectionRange / oclExpression

collectionRange = first:oclExpression opDoubleDot last:oclExpression {
    return {
        partType: "range",
        first: first,
        last: last
    }
}


tupleLiteral = kwTuple opLBrace variableList:variableDeclarationList opRBrace {
    return {
        literalType: "tuple",
        variableList: variableList
    }
}

variableDeclarationList = firstVar:variableDeclaration otherVars:( opComma variable:variableDeclaration { return variable; })*
{
    return [firstVar].concat(otherVars);
}

variableDeclaration = name:simpleName typeDefinition:( opColon type:typeDefinition { return type })? 
                    initExpression:(opEqual expression:oclExpression { return expression } )? 
{
    return {
        variableName: name,
        typeDefinition: typeDefinition,
        initExpression: initExpression
    }
}

primitiveLiteral = booleanLiteral / numberLiteral / stringLiteral / nullLiteral / invalidLiteral

nullLiteral = kwNull {
    return {
        literalType: "null"
    }
}

invalidLiteral = kwInvalid {
    return {
        literalType: "invalid"
    }
}

stringLiteral = value:( stringInQuotes / stringInDoubleQuotes ) {
    return {
        literalType: "string",
        value: value
    }
}

numberLiteral = value:( number / '*' ) {
    return {
        literalType: "number",
        value: value === '*' ? "infinity" : value
    }
}

booleanLiteral = value:(kwTrue / kwFalse) {
    return {
        literalType: "boolean",
        value: value
    }
}

/*
    Type definition
*/

typeDefinition = typeDef:(pathName / collectionType / tupleType / primitiveType / oclType) {
    typeDef.termType = "typeDefinition";
    return typeDef;
}

primitiveType = name:(kwBoolean / kwString / kwInteger / kwReal / kwUnlimitedNatural) {
    return {
        typeClass: "primitiveType",
        name: name
    }
}

pathName = pathname:navigation {
    return {
        typeClass: "pathname",
        pathname: pathname
    }
} 

oclType = name:(kwOclAny / kwOclInvalid / kwOclVoid) {
    return {
        typeClass: "oclType",
        name: name
    }
}

collectionType = name:collectionTypeIdent opLParen itemType:typeDefinition opRParen {
    return {
        typeClass: "collectionType",
        name: name,
        itemType: itemType
    }
}

collectionTypeIdent = kwBag / kwSet / kwOrderedSet / kwCollection / kwSequence

tupleType = kwTuple opLParen variables:variableDeclarationList? opRParen {
    return {
        typeClass: "tupleType",
        variables: variables === null ? [] : variables
    }
}


/*
    KEYWORDS
*/

keyword = opNot / opAnd / opOr / opXor / opImplies / kwContext / kwEndPackage / kwPackage / kwTrue
        / kwFalse / kwSelf / kwPrecondition / kwPostcondition / kwInvariant / kwBody / kwDerive 
        / kwIf / kwThen / kwElse / kwEndIf / kwNull / kwInvalid / kwTuple / kwBoolean / kwInteger
        / kwReal / kwString / kwUnlimitedNatural / kwOclAny / kwOclInvalid / kwOclVoid
        / kwSet / kwBag / kwSequence / kwCollection / kwOrderedSet / kwLet / kwIn / kwStatic

kwLet = "let" KW_SEP

kwIn = "in" KW_SEP

kwSet = "Set" KW_SEP { return "Set"; }

kwBag = "Bag" KW_SEP { return "Bag"; }

kwSequence = "Sequence" KW_SEP { return "Sequence"; }

kwCollection = "Collection" KW_SEP { return "Collection"; }

kwOrderedSet = "OrderedSet" KW_SEP { return "OrderedSet"; }

kwOclAny = "OclAny" KW_SEP { return "OclAny"; }

kwOclInvalid = "OclInvalid" KW_SEP { return "OclInvalid"; }

kwOclVoid = "OclVoid" KW_SEP { return "OclVoid"; }

kwBoolean = "Boolean" KW_SEP { return "Boolean"; }

kwInteger = "Integer" KW_SEP { return "Integer"; }

kwReal = "Real" KW_SEP { return "Real"; }

kwString = "String" KW_SEP { return "String"; }

kwUnlimitedNatural = "UnlimitedNatural" KW_SEP { return  "UnlimitedNatural"; }

kwTuple = "Tuple" KW_SEP

kwStatic = "static" KW_SEP

kwNull = "null" KW_SEP

kwInvalid = "invalid" KW_SEP

kwIf = "if" KW_SEP

kwThen = "then" KW_SEP

kwElse = "else" KW_SEP

kwEndIf = "endif" KW_SEP

kwPackage = "package" KW_SEP

kwEndPackage = "endpackage" KW_SEP

kwContext = "context" KW_SEP

kwPrecondition = "pre"  KW_SEP  { return "pre"; }

kwPostcondition = "post"  KW_SEP { return "post"; }

kwInvariant = "inv" KW_SEP { return "inv"; }

kwBody = "body" KW_SEP { return "body"; }

kwDerive = "derive" KW_SEP { return "derive"; }

kwSelf = "self" KW_SEP

kwTrue = "true" KW_SEP { return "true"; }

kwFalse = "false" KW_SEP { return "false"; }

KW_SEP = __ / & ( operator )

/*
    OPERATORS
*/

operator = opArrow / opNot / opMult / opDiv / opMinus / opPlus / opLess / opGreater / opLessOrEqual 
        / opGreaterOrEqual / opEqual / opNotEqual / opAnd / opOr / opXor / opImplies / opDoubleColon
        / opColon / opSlimArrow / opLBrace / opRBrace / opDoubleDot / opDot / opVerticalLine / opSemiColon

opVerticalLine = "|" _

opDoubleDot = ".." _

opSlimArrow = "->" _

opComma = "," _

opDoubleColon = "::" _

opColon = ":" _

opSemiColon = ";" _

opPrevValue = "@pre" _

opDot = "." _

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

opLBrace = "{" _

opRBrace = "}" _

/*
    OTHER LEXICAL ELEMENTS
*/

stringInQuotes = !('_') "'" value:[^']* "'" { 
    return value.join("");
}

stringInDoubleQuotes =  "\"" value:[^"]* "\"" { 
        return value.join("");
}
 
number = wholePart:digit+ decimalPart:( "."  decimalPart:digit+ { return decimalPart.join(""); } )? { 
    var number = wholePart.join("");
    if(decimalPart !== null) {
        number += "." + decimalPart;
    }
    return number;
}

reservedWords = keyword / builtInFunctionNames / opSlimArrow collectionFunctionNames

simpleName = "_'" data:[^']+ "'" { return data.join(""); }
            / identifier


identifier = !(reservedWords) first:letter other:(digit / letter)* _
{ return first + other.join(""); }

letter = [A-Za-z_]

digit = [0-9]

_ = [ \n\r\t]*
__ = [ \n\r\t]+