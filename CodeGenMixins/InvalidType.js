
var InvalidTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "InvalidType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = InvalidTypeCodeGenMixin;
