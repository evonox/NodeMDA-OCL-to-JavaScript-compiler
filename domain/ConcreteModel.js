
class Parameter {
    constructor(paramName, paramType) {
        this._paramName = paramName;
        this._paramType = paramType;
    }

    get paramName() { return this._paramName; }
    get paramType() { return this._paramType; }
}

class OclBodyConstraint {

    constructor(name) {
        this._name = name;
        this._parameters = new Array();
        this._expression = null;
    }

    get name() { return this._name; }
    get expression() { return this._expression; }
    get parameters() { return this._parameters; }

    set expression(value) { this._expression = value; }

    addParameter(param) {
        this._parameters.push(param);
    }
}


class Operation {

    constructor(operationName) {
        this._operationName = operationName;
        this._parameters = new Array();
        this._preconditions = new Array();
        this._postconditions = new Array();
    }

    get operationName() { return this._operationName; }

    get parameters() { return this._parameters; }
    get preconditions() { return this._preconditions; }
    get postconditions() { return this._postconditions; }

    addParameter(param) {
        this._parameters.push(param);
    }

    addPrecondition(rule) {
        this._preconditions.push(rule);
    }

    addPostconidition(rule) {
        this._postconditions.push(rule);
    }
}

class ClassElement {

    constructor(className) {
        this._className = className;
        this._packagePath = new Array();
        this._invariants = new Array();
        this._operations = new Array();
        this._oclBodyConstraints = new Array();
    }

    get className() { return this._className; }

    get filePath() {
        return this._packagePath.join("/") + "/" + this.className;
    }

    get invariants() { return this._invariants; }
    get operations() { return this._operations; }
    get oclBodyConstraints() { return this._oclBodyConstraints; }
    get packagePath() { return this._packagePath; }

    addPackagePath(packagePath) {
        if(packagePath instanceof Array) {
            this._packagePath = this._packagePath.concat(packagePath);
        } else {
            this._packagePath.push(packagePath);
        }
    }

    addInvariant(invariant) {
        this._invariants.push(invariant);
    }

    addOperation(operation) {
        this._operations.push(operation);
    }

    addOclBodyConstraint(constraint) {
        this._oclBodyConstraints.push(constraint);
    }
}

class Model {

    constructor() {
        this._classes = new Array();
    }

    get classes() { return this._classes; }

    createClass(className) {
        let classElement = new ClassElement(className);
        this._classes.push(classElement);
        return classElement;
    }
}

module.exports = {
    Model: Model,
    ClassElement: ClassElement,
    Operation: Operation,
    Parameter: Parameter,
    OclBodyConstraint: OclBodyConstraint
}
