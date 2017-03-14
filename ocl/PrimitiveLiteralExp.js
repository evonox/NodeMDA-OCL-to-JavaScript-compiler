const LiteralExp = require("./LiteralExp");
const codeGenMixin = require("../CodeGenMixins/PrimitiveLiteralExp");



class PrimitiveLiteralExp extends codeGenMixin(LiteralExp) {

	constructor() {

		super();

	

	}

}//end PrimitiveLiteralExp

 module.exports = PrimitiveLiteralExp;
