const am = require("../domain/AbstractModel");

class AbstractModelTypeResolver {

    resolve(umlModel, amModel) {
        umlModel.classes.every( (umlClass) => {
            this.resolveClass(umlClass, amModel);
            return true;
        });
    }

    resolveClass(umlClass, amModel) {
        let classPath = this.getClassPath(umlClass);
        let amClass = amModel.findElementByPath(classPath);
        console.dir(classPath);
        if(amClass === null) return;
        amClass.elementType = am.eElementType.Class;

        this.resolvePackages(amClass.parentElement);
        this.resolveAttributes(umlClass, amClass);
        this.resolveOperations(umlClass, amClass);
    }

    resolveAttributes(umlClass, amClass) {
        umlClass.attributes.every( (umlAttr) => {
            let amAttr = amClass.getChildElementByName(umlAttr.name);
            if(amAttr !== null) {
                amAttr.elementType = am.eElementType.Attribute;
            }
            return true;
        });
    }

    resolveOperations(umlClass, amClass) {
        umlClass.operations.every( (umlOperation) => {
            let amOperation = amClass.getChildElementByName(umlOperation.name);
            if(amOperation !== null) {
                amOperation.elementType = am.eElementType.Operation;
            }
            return true;
        });
    }

    resolvePackages(amPackage) {
        while(amPackage !== null) {
            amPackage.elementType = am.eElementType.Package;
            amPackage = amPackage.parentElement;
        }
    }

    getClassPath(umlClass) {
        if(umlClass._package === null) return [umlClass.name];
        else {
            return umlClass._package.nameAsArray.concat(umlClass.name);
        }
    } 
}

module.exports = {
    resolve: function(umlModel, amModel) {
        new AbstractModelTypeResolver().resolve(umlModel, amModel);
    }
}