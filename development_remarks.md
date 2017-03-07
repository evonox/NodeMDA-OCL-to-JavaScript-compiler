PLAN PRACE - Literals
=====================
1. Doladit lexikalni elementy dle standardu OCL - definovat plan
    1. **Check, which operators support left associativity - EXAMINE AND CHANGE GRAMMAR**
    2. Develop PDF with not supported OCL lang features
        1. OclMessage support + coexisting operators
2. Tuning UP AST and grammar
    1. Complete FeatureCall expression
    2. Complete AST for LoopExpressions
    3. Check AST
3. Develop the first handlebars rendering of expressions, 
    2. OperatorExpressions
    3. **RightToLeftAssocConverter** AST post-processing
4. Study environment issue for UML Model Queries, needed for type resolving and type checking
5. Verify info of nested comments and add not supported - cannot be done by lexical analysis
6. Add no support for allInstances method

SKIPPED TEMPLATES:
==================
- Enumeration literal - how to declare enumerations????
 
DALSI VYVOJ
===========
1. environment - UMLModeQuery package
2. Type Resolvng and checking
3. **ShortHandDecomposer** - collection conversion and primitive type to collection conversion
4. Syntactic shorthands and their decompositon
    1. Study OCL Standard Library
    2. Prepare the list of standard functions into parser - FOR EACH TYPE
    3. Prepare the list of standard functions for each type, COLLECTION and PRIMITIVE TYPES
    4. Extend not supported PDF document
    1. Navigations - automatic collecting
    2. Automatic conversions of collection types
    3. Rename firstArgumet to leadingArgument
5. Study class diagram issus and types of constraints and add other types of diagrams NOT SUPPORTED
6. @pre keyword


1. Resolving OclTypes - NEEDS VERIFICATION
==========================================
1. Nastudovat
    1. Profil NodeMDA - primitive types
    2. Typy Ocl
    3. Extracting DataTypes z UML modelu
2. Definovat mapovaci JSON file mezi profilem a OclTypes
3. Analyza problemu
    1. Typy navigaci
        1. Kazdy Step navigace
        2. Argumenty navigaci
    2. Typy atributu
    3. Typy parametru Body - vyjmenovane
    4. Typy parametru funkci - vyjmenovane
    5. Type SELF
4. Resolving, OclType Primitive nebo ReferenceType
5. Jak s CollectionTypes? attribute multiplicity and other flags
6. Definovat vystup do AST


javascript-es6-ocl plugin
=========================
- zapouzdreni volani operaci - business logika s nejakym suffixem "_impl" - vlastnost outer es6 frameworku
    1. Generovani i prazdnych OCL souboru pro tridy, usetreni prace pro generator
    2. Generovani require stamentens pro including OCL constraint file do ES6-OCL generatoru
    - dulezite, aby nebylo zapomenuto volani postConditions


