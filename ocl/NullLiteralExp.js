const LiteralExp = require("./LiteralExp");
const codeGenMixin = require("../CodeGenMixins/NullLiteralExp");



class NullLiteralExp extends codeGenMixin(LiteralExp) {

	constructor() {

		super();

	

	}

}//end NullLiteralExp

 module.exports = NullLiteralExp;
