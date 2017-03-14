const CallExp = require("./CallExp");
const codeGenMixin = require("../CodeGenMixins/LoopExp");



class LoopExp extends codeGenMixin(CallExp) {

	constructor() {

		super();

	

	}

}//end LoopExp

 module.exports = LoopExp;
