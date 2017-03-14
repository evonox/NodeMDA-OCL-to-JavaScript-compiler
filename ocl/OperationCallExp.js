const FeatureCallExp = require("./FeatureCallExp");
const codeGenMixin = require("../CodeGenMixins/OperationCallExp");



class OperationCallExp extends codeGenMixin(FeatureCallExp) {

	constructor() {

		super();

	

	}

}//end OperationCallExp

 module.exports = OperationCallExp;
