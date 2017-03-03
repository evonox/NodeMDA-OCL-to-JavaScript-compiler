const am = require("./AbstractModel");
const cm = require("./ConcreteModel");

class ConcreteModelBuilder {

    build(amModel) {
        this._cmModel = new cm.Model();
        this._amPath = new Array();
        this.traverseAM(amModel);
        return this._cmModel;
    }

    traverseAM(amModel) {
        amModel.childElements.every( (childNode) => {
            this.processAMNode(childNode);
            this._amPath.push(childNode.name);
            this.traverseAM(childNode);
            this._amPath.pop();
            return true;
        });
    }

    processAMNode(amModel) {
        if(amModel.elementType === am.eElementType.Class) {
            this.processClass(amModel);
        }
    }

    processClass(amModel) {
        let classElement = this._cmModel.createClass(amModel.name);
        classElement.addPackagePath(this._amPath);
        this.traverseClassAM(amModel, classElement);
    }

    traverseClassAM(amModel, classElement) {
        this.processClassAMNode(amModel, classElement);
        amModel.childElements.every( (childElement) => {
            this.traverseClassAM(childElement, classElement);
            return true;
        });
    }

    processClassAMNode(amModel, classElement) {
        this.processRules(amModel, classElement);
        if(amModel.elementType === am.eElementType.Operation) {
            this.processOperation(amModel, classElement);
        }
    }

    processRules(amModel, classElement) {
        this.mergeInvariants(amModel, classElement);
    }

    processOperation(amModel, classElement) {
        let operation = new cm.Operation(amModel.name);
        classElement.addOperation(operation);

        amModel.operationParams.every( (param) => {
            let cmParam = new cm.Paramter(param.parameterName, param.parameterType);
            operation.addParameter(cmParam);
            return true;
        });
        amModel.preConditions.every( (rule) => {
            operation.addPrecondition(rule);
            return true;
        });
        amModel.postConditions.every( (rule) => {
            operation.addPostcondition(rule);
            return true;
        });
    }
 
    mergeInvariants(amModel, classElement) {
        amModel.invariants.every( (invariant) => {
            classElement.addInvariant(invariant);
        });
    }
}

module.exports = {

    build: function(amModel) {
        return (new ConcreteModelBuilder()).build(amModel);
    }
}