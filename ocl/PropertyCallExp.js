const NavigationCallExp = require("./NavigationCallExp");
const codeGenMixin = require("../CodeGenMixins/PropertyCallExp");



class PropertyCallExp extends codeGenMixin(NavigationCallExp) {

	constructor() {

		super();

	

	}

}//end PropertyCallExp

 module.exports = PropertyCallExp;
