const NavigationCallExp = require("./NavigationCallExp");
const codeGenMixin = require("../CodeGenMixins/AssociationClassCallExp");



class AssociationClassCallExp extends codeGenMixin(NavigationCallExp) {

	constructor() {

		super();

	

	}

}//end AssociationClassCallExp

 module.exports = AssociationClassCallExp;
