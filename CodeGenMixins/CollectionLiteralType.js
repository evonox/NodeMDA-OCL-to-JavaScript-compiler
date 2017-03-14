
var CollectionLiteralTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CollectionLiteralType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CollectionLiteralTypeCodeGenMixin;
