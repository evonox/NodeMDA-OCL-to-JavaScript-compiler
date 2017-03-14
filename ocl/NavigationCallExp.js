const FeatureCallExp = require("./FeatureCallExp");
const codeGenMixin = require("../CodeGenMixins/NavigationCallExp");



class NavigationCallExp extends codeGenMixin(FeatureCallExp) {

	constructor() {

		super();

	

	}

}//end NavigationCallExp

 module.exports = NavigationCallExp;
