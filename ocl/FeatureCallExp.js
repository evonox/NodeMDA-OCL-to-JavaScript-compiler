const CallExp = require("./CallExp");
const codeGenMixin = require("../CodeGenMixins/FeatureCallExp");



class FeatureCallExp extends codeGenMixin(CallExp) {

	constructor() {

		super();

	

	}

}//end FeatureCallExp

 module.exports = FeatureCallExp;
