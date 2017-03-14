
var CollectionLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CollectionLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CollectionLiteralExpCodeGenMixin;
