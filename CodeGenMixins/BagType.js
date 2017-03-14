
var BagTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "BagType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = BagTypeCodeGenMixin;
