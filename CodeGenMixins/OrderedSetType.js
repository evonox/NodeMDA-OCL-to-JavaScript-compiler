
var OrderedSetTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "OrderedSetType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = OrderedSetTypeCodeGenMixin;
