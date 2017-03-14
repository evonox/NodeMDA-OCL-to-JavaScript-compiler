
var VoidTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "VoidType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = VoidTypeCodeGenMixin;
