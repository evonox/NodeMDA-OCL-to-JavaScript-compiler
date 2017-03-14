const CollectionType = require("./CollectionType");
const codeGenMixin = require("../CodeGenMixins/OrderedSetType");



class OrderedSetType extends codeGenMixin(CollectionType) {

	constructor() {

		super();

	

	}

}//end OrderedSetType

 module.exports = OrderedSetType;
