
var TupleTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "TupleType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = TupleTypeCodeGenMixin;
