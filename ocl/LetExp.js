const OclExpression = require("./OclExpression");
const codeGenMixin = require("../CodeGenMixins/LetExp");



class LetExp extends codeGenMixin(OclExpression) {

	constructor() {

		super();

	

	}

}//end LetExp

 module.exports = LetExp;
