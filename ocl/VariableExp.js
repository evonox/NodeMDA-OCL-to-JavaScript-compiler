const OclExpression = require("./OclExpression");
const codeGenMixin = require("../CodeGenMixins/VariableExp");



class VariableExp extends codeGenMixin(OclExpression) {

	constructor() {

		super();

		this.referredVariable=null;	

	}

}//end VariableExp

 module.exports = VariableExp;
