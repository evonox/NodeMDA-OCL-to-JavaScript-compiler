const LiteralExp = require("./LiteralExp");
const codeGenMixin = require("../CodeGenMixins/InvalidLiteralExp");



class InvalidLiteralExp extends codeGenMixin(LiteralExp) {

	constructor() {

		super();

	

	}

}//end InvalidLiteralExp

 module.exports = InvalidLiteralExp;
