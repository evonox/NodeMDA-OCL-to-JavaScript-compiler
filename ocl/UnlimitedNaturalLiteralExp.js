const NumericLiteralExp = require("./NumericLiteralExp");
const codeGenMixin = require("../CodeGenMixins/UnlimitedNaturalLiteralExp");



class UnlimitedNaturalLiteralExp extends codeGenMixin(NumericLiteralExp) {

	constructor() {

		super();

	

	}

}//end UnlimitedNaturalLiteralExp

 module.exports = UnlimitedNaturalLiteralExp;
