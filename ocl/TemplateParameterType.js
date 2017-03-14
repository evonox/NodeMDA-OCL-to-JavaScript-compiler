const Classifier = require("./Classifier");
const codeGenMixin = require("../CodeGenMixins/TemplateParameterType");



class TemplateParameterType extends codeGenMixin(Classifier) {

	constructor() {

		super();

		this.specification = null;	

	}

}//end TemplateParameterType

 module.exports = TemplateParameterType;
