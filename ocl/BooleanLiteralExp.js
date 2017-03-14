const PrimitiveLiteralExp = require("./PrimitiveLiteralExp");
const codeGenMixin = require("../CodeGenMixins/BooleanLiteralExp");



class BooleanLiteralExp extends codeGenMixin(PrimitiveLiteralExp) {

	constructor() {

		super();

	

	}

}//end BooleanLiteralExp

 module.exports = BooleanLiteralExp;
