const NavigationCallExp = require("./NavigationCallExp");
const codeGenMixin = require("../CodeGenMixins/AssociationCallExp");



class AssociationCallExp extends codeGenMixin(NavigationCallExp) {

	constructor() {

		super();

	

	}

}//end AssociationCallExp

 module.exports = AssociationCallExp;
