
var CollectionKindCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CollectionKind";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CollectionKindCodeGenMixin;
