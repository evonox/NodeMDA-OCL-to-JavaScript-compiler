const LiteralExp = require("./LiteralExp");
const codeGenMixin = require("../CodeGenMixins/EnumLiteralExp");



class EnumLiteralExp extends codeGenMixin(LiteralExp) {

	constructor() {

		super();

	

	}

}//end EnumLiteralExp

 module.exports = EnumLiteralExp;
