const OclExpression = require("./OclExpression");
const codeGenMixin = require("../CodeGenMixins/IfExp");



class IfExp extends codeGenMixin(OclExpression) {

	constructor() {

		super();

	

	}

}//end IfExp

 module.exports = IfExp;
