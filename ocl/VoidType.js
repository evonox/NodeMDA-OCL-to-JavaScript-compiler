const Classifier = require("./Classifier");
const codeGenMixin = require("../CodeGenMixins/VoidType");



class VoidType extends codeGenMixin(Classifier) {

	constructor() {

		super();

	

	}

}//end VoidType

 module.exports = VoidType;
