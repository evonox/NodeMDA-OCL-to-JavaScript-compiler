const CollectionType = require("./CollectionType");
const codeGenMixin = require("../CodeGenMixins/SequenceType");



class SequenceType extends codeGenMixin(CollectionType) {

	constructor() {

		super();

	

	}

}//end SequenceType

 module.exports = SequenceType;
