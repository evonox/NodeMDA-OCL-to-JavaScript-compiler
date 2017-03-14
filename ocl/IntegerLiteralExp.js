const NumericLiteralExp = require("./NumericLiteralExp");
const codeGenMixin = require("../CodeGenMixins/IntegerLiteralExp");



class IntegerLiteralExp extends codeGenMixin(NumericLiteralExp) {

	constructor() {

		super();

	

	}

}//end IntegerLiteralExp

 module.exports = IntegerLiteralExp;
