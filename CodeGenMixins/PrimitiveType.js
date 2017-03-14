
var PrimitiveTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "PrimitiveType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = PrimitiveTypeCodeGenMixin;
