const PrimitiveLiteralExp = require("./PrimitiveLiteralExp");
const codeGenMixin = require("../CodeGenMixins/NumericLiteralExp");



class NumericLiteralExp extends codeGenMixin(PrimitiveLiteralExp) {

	constructor() {

		super();

	

	}

}//end NumericLiteralExp

 module.exports = NumericLiteralExp;
