const Classifier = require("./Classifier");
const codeGenMixin = require("../CodeGenMixins/InvalidType");



class InvalidType extends codeGenMixin(Classifier) {

	constructor() {

		super();

	

	}

}//end InvalidType

 module.exports = InvalidType;
