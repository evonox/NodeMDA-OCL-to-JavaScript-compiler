
var CollectionRangeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CollectionRange";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CollectionRangeCodeGenMixin;
