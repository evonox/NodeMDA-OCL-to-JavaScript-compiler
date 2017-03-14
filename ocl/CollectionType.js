const DataType = require("./DataType");
const codeGenMixin = require("../CodeGenMixins/CollectionType");



class CollectionType extends codeGenMixin(DataType) {

	constructor() {

		super();

		this.elementType = null;	

	}

}//end CollectionType

 module.exports = CollectionType;
