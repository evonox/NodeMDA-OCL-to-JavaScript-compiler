const CollectionLiteralType = require("./CollectionLiteralType");
const codeGenMixin = require("../CodeGenMixins/CollectionItem");



class CollectionItem extends codeGenMixin(CollectionLiteralType) {

	constructor() {

		super();

	

	}

}//end CollectionItem

 module.exports = CollectionItem;
