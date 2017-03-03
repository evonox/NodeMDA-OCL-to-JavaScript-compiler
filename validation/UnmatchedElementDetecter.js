const winston = require("winston");
const am = require("../domain/AbstractModel");

class UnmatchedElementDetector {

    detect(amModel) {
        this.packagePath = new Array();
        this.search(amModel);
    }

    search(amElement) {
        this.checkElement(amElement);
        this.packagePath.push(amElement.name);
        amElement.childElements.every( (childElement) => {
            this.search(childElement);
            return true;
        });
        this.packagePath.pop();
    }

    checkElement(amElement) {
        if(amElement.elementType === am.eElementType.None) {
            let elementPath = this.packagePath.join("::") + "::" + amElement.name;
            winston.error(`OCL Constraint with path '${elementPath}' not found in UML model.`);
        }
    }
}

module.exports = {
    detect: function(amModel) {
        new UnmatchedElementDetector().detect(amModel);
    }
}