class UMLElement {
    constructor(metaElement) {
        this.metaElement = metaElement;
        this.childElements = new Array();
    }

    addChildElement(childElement) {
        this.childElements(childElement);
    }

    get name() {
        return this.metaElement === null ? "" : this.metaElement.name;
    }

    isPackage() { return false; }
    isClass() { return false; }
    isDataType() { return false; }
    isOperation() { return false; }
    isAttribute() { return false; }
    isAssociation() { return false; }
    isDependency() { return false; }
    isGeneralization() { return false; }

    getNamespace(namespace) {
        namespace = namespace.slice(0);
        if(namespace.length === 0) return this;
        let name = namespace.unshift();
        let childElement = this.getChildElementByName(name);
        if(childElement === null) return null;
        else return childElement.getNamespace(namespace);
    }

    getChildElementByName(name) {
        let found = null;
        this.childElements.every((childElement) => {
            if(childElement.name === name)
                found = childElement;
            return true;
        });
        return found;
    }   
}

class Package extends UMLElement {
    constructor(name) {
        super(null);
        this._name = name;
    }

    isPackage() { return true; }

    get name() { return this._name; }

    getChildPackage(name) {
        let found = this.getChildElementByName(name);
        if(found === null) return null;
        return found.isPackage() ? found : null;
    }   
}

class Class extends UMLElement {
    constructor(metaElement) {
        super(metaElement);
    }

    isClass() { return true; }
}

class DataType extends UMLElement {
    constructor(metaElement) {
        super(metaElement);
    }

    isDataType() { return true; }
}

class Operation extends UMLElement {
    constructor(metaElement) {
        super(metaElement)
    }

    isOperation() { return true; }
}

class Attribute extends UMLElement {
    constructor(metaElement) {
        super(metaElement)
    }

    isAttribute() { return true; }
}

class Association extends UMLElement {
    constructor(metaElement) {
        super(metaElement)
    }

    isAssociation() { return true; }

    get name() {
        return this.metaElement.myEnd.name;
    }
}

class Dependency extends UMLElement {
    constructor(metaElement) {
        super(metaElement)
    }

    get name() { return ""; }

    isDependency() { return true; }
}

class Generalization extends UMLElement {
    constructor(metaElement) {
        super(metaElement)
    }

    get name() { return ""; }

    isGeneralization() { return true; }
}


// The job of this class is to provide interface for querying meta-model of NodeMDA
class MetaModelQueryFacade {

    constructor(metaModel) {
        this.metaModel = metaModel;
        this.parseMetaModel();
    }

    /*
        Query methods
    */
    getRootPackage() { return this.rootPackage; }
    queryTopPackages() {}
    queryChildPackages(packageHandle) {}
    queryClasses(packageHandle) {}
    queryDataTypes(packageHandle) {}

    getElementComment(elementHandle) {}
    getElementName(elementHandle) {}
    getElementStereotypes(elementHandle) {}
    getElementTagValues(elementHandle) {}  

    getClassAssociations(classHandle) {}
    getClassAttributes(classHandle) {}
    getClassDependencies(classHandle) {}
    getClassGeneralizations(classHandle) {}
    getClassOperations(classHandle) {}

    getOperationParameters(operationHandle) {}
    /*
        NodeMDA Meta-model parsing methods
    */

    parseMetaModel() {
        this.rootPackage = new Package("");
        this.parseClasses();
        this.parseDataTypes();
    }

    parseClasses() {
        this.metaModel.classes.every((classElement) => {
            let packagePath = classElement._package.nameAsArray();
            this.addPackagePath(packagePath);
            let package = this.rootPackage.getNamespace(packagePath);
            if(package === null)
                throw new Error("Cannot add class to a package. Package not found.");
            let umlClass = new Class(classElement)
            package.addChildElement(umlClass);
            this.parseOperations(classElement, umlClass);
            this.parseAttributes(classElement, umlClass);
            this.parseAssociations(classElement, umlClass);
            this.parseDependencies(classElement, umlClass);
            this.parseGeneralizations(classElement, umlClass);
            return true;
        });
    }

    parseOperations(metaClass, umlClass) {
        metaClass.operations.every((operation) => {
            umlClass.addChildElement(new Operation(operation));
            return true;
        });
    }

    parseAttributes(metaClass, umlClass) {
        metaClass.attributes.every((attribute) => {
            umlClass.addChildElement(new Attribute(attribute));
            return true;
        });
    }

    parseAssociations(metaClass, umlClass) {
        metaClass.associations.every((assoc) => {
            umlClass.addChildElement(new Association(assoc));
            return true;
        });
    }

    parseDependencies(metaClass, umlClass) {
        metaClass.dependencies.every((dependency) => {
            umlClass.addChildElement(new Dependency(dependency));
            return true;
        });
    }

    parseGeneralizations(metaClass, umlClass) {
        metaClass.generalizations.every((generalization) => {
            umlClass.addChildElement(new Generalization(generalization));
            return true;
        });
    }

    parseDataTypes() {
        this.metaModel.datatypes.every ((datatype) => {
            if(! datatype.isObject()) return true;
            // TODO Cannot get from NodeMDA the right delmiter in loose-coupling way
            let packagePath = datatype.packageName.split("::"); 
            this.addPackagePath(packagePath);
            let package = this.rootPackage.getNamespace(packagePath);
            if(package === null)
                throw new Error("Cannot add datatype to a package. Package not found.");
            package.addChildElement(new DataType(datatype));
            return true;
        });
    }

    addPackagePath(packagePath) {
        packagePath = packagePath.slice(0);
        this.addPackage(this.rootPackage, packagePath);
    }

    addPackage(parentPackage, pathToAdd) {
        if(pathToAdd.length === 0) return;
        let packageName = pathToAdd.unshift();
        let package =  parentPackage.getChildPackage(packageName);
        if(package === null) {
            package = new Package(packageName);
            parentPackage.addChildElement(package);
        }
        this.addPackage(package, pathToAdd);
    }
}

module.exports = {
    parse(metaModel) {
        return new MetaModelQueryFacade(metaModel);
    }
}