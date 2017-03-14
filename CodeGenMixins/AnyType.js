
var AnyTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "AnyType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = AnyTypeCodeGenMixin;
