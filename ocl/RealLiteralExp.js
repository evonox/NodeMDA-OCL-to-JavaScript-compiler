const NumericLiteralExp = require("./NumericLiteralExp");
const codeGenMixin = require("../CodeGenMixins/RealLiteralExp");



class RealLiteralExp extends codeGenMixin(NumericLiteralExp) {

	constructor() {

		super();

	

	}

}//end RealLiteralExp

 module.exports = RealLiteralExp;
