
var CollectionTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CollectionType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CollectionTypeCodeGenMixin;
