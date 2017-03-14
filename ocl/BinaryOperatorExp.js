const OperatorExp = require("./OperatorExp");
const codeGenMixin = require("../CodeGenMixins/BinaryOperatorExp");



class BinaryOperatorExp extends codeGenMixin(OperatorExp) {

	constructor() {

		super();

	

	}

}//end BinaryOperatorExp

 module.exports = BinaryOperatorExp;
