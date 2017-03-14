const codeGenMixin = require("../CodeGenMixins/CollectionKind");



class CollectionKind extends codeGenMixin(Object) {

	constructor() {

		this.Collection = null;
		this.Set = null;
		this.OrderedSet = null;
		this.Bag = null;
		this.Sequence = null;	

	}

}//end CollectionKind

 module.exports = CollectionKind;
