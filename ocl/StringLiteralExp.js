const PrimitiveLiteralExp = require("./PrimitiveLiteralExp");
const codeGenMixin = require("../CodeGenMixins/StringLiteralExp");



class StringLiteralExp extends codeGenMixin(PrimitiveLiteralExp) {

	constructor() {

		super();

	

	}

}//end StringLiteralExp

 module.exports = StringLiteralExp;
