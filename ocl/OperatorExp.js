const OclExpression = require("./OclExpression");
const codeGenMixin = require("../CodeGenMixins/OperatorExp");



class OperatorExp extends codeGenMixin(OclExpression) {

	constructor() {

		super();

	

	}

}//end OperatorExp

 module.exports = OperatorExp;
