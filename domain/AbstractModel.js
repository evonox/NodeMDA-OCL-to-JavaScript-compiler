
class eElementType {}
eElementType.None = 0;
eElementType.Package = 1;
eElementType.Class = 2;
eElementType.Attribute = 3;
eElementType.Operation = 4;
eElementType.OclBody = 5;
eElementType.OclDerive = 6;

class AbstractElement {

    constructor(name) {
        this._name = name;
        this._elementType = eElementType.None;
        this._parentElement = null;
    }

    get name() { return this._name; }

    get elementType() { return this._elementType; }
    set elementType(value) { this._elementType = value; }

    get parentElement() { return this._parentElement; }
    set parentElement(value) { this._parentElement = value; }
}

class ContainerElement extends AbstractElement {

    constructor(name) {
        super(name);
        this._childElements = new Array();
    }

    addChildElement(childElement) {
        this._childElements.push(childElement);
        childElement.parentElement = this;
    }

    createElement(elementPath) {
        let container = this;
        for(let elementName of elementPath) {
            let umlElement = container.getChildElementByName(elementName);
            if(umlElement === null) {
                umlElement = new UMLElement(elementName);
                container.addChildElement(umlElement);
            }
            container = umlElement;
        }
        return container;
    }

    findElementByPath(path, delimiter = "::") {
        if(! (path instanceof Array)) {
            path = path.split(delimiter);
        }

        let container = this;
        for(let elementName of path) {
            let element = container.getChildElementByName(elementName);
            if(element === null) return null;
            container = element;
        }
        return container;
    }

    getChildElementByName(name) {
        for(let childElement of this.childElements) {
            if(childElement.name === name)
                return childElement;
        }
        return null;
    }

    get childElements () {
        return this._childElements;
    }
}

class Model extends ContainerElement {

    constructor() {
        super();
        this._elementType = eElementType.Package;
    }
}

class UMLElement extends ContainerElement {

    constructor(name) {
        super(name);
        this._invariants = new Array();
        this._preConditions = new Array()
        this._postConditions = new Array();
        this._operationParams = new Array();
        this._bodyConstraints = new Array();
        this._deriveConstraints = new Array();
    }

    get invariants() { return this._invariants; }
    get preConditions() { return this._preConditions }
    get postConditions() { return this._postConditions; }
    get operationParams() { return this._operationParams; }
    get bodyConstraints() { return this._bodyConstraints; }
    get deriveConstraints() { return this._deriveConstraints; }

    addInvariant(rule) {
        this._invariants.push(rule);
    }

    addPreCondition(rule) {
        this._preConditions.push(rule);
    }

    addPostCondition(rule) {
        this._postConditions.push(rule);
    }

    addBodyConstraint(rule) {
        this._bodyConstraints.push(rule);
    }

    addDeriveConstraint(rule) {
        this._deriveConstraints.push(rule);
    }

    addOperationParam(param) {
        this._operationParams.push(param);
    }

    isBodyConstraintValid() {
        if(this.bodyConstraints.length !== 1)
            return false;
        if(this.preConditions.length !== 0)
            return false;
        if(this.postConditions.length !== 0)
            return false;
        if(this.invariants.length !== 0)
            return false;
        if(this.deriveConstraints.length !== 0)
            return false;
        return true;
    }

    isDeriveConstraintValid() {
        if(this.deriveConstraints.length !== 1)
            return false;
        if(this.preConditions.length !== 0)
            return false;
        if(this.postConditions.length !== 0)
            return false;
        if(this.invariants.length !== 0)
            return false;
        if(this.bodyConstraints.length !== 0)
            return false;
        return true;
    }
}

module.exports = {
    Model: Model,
    UMLElement: UMLElement,
    eElementType: eElementType
};