
var EnumLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "EnumLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = EnumLiteralExpCodeGenMixin;
