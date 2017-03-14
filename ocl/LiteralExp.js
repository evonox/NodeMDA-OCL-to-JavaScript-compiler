const OclExpression = require("./OclExpression");
const codeGenMixin = require("../CodeGenMixins/LiteralExp");



class LiteralExp extends codeGenMixin(OclExpression) {

	constructor() {

		super();

	

	}

}//end LiteralExp

 module.exports = LiteralExp;
