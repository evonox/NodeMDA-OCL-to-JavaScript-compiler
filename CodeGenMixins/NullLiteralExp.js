
var NullLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "NullLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = NullLiteralExpCodeGenMixin;
