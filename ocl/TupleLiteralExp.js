const LiteralExp = require("./LiteralExp");
const codeGenMixin = require("../CodeGenMixins/TupleLiteralExp");



class TupleLiteralExp extends codeGenMixin(LiteralExp) {

	constructor() {

		super();

	

	}

}//end TupleLiteralExp

 module.exports = TupleLiteralExp;
