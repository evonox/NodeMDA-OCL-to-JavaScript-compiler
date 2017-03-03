
class Parameter {
    constructor(paramName, paramType) {
        this._paramName = paramName;
        this._paramType = paramType;
    }

    get paramName() { return this._paramName; }
    get paramType() { return this._paramType; }
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
    }

    get className() { return this._className; }

    get filePath() {
        return this._packagePath.join("/") + "/" + this.className;
    }

    get invariants() { return this._invariants; }
    get operations() { return this._operations; }
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
    Parameter: Parameter
}
