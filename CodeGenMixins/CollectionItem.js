
var CollectionItemCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CollectionItem";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CollectionItemCodeGenMixin;
