const OperatorExp = require("./OperatorExp");
const codeGenMixin = require("../CodeGenMixins/UnaryOperatorExp");



class UnaryOperatorExp extends codeGenMixin(OperatorExp) {

	constructor() {

		super();

	

	}

}//end UnaryOperatorExp

 module.exports = UnaryOperatorExp;
