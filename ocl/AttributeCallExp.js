const FeatureCallExp = require("./FeatureCallExp");
const codeGenMixin = require("../CodeGenMixins/AttributeCallExp");



class AttributeCallExp extends codeGenMixin(FeatureCallExp) {

	constructor() {

		super();

	

	}

}//end AttributeCallExp

 module.exports = AttributeCallExp;
