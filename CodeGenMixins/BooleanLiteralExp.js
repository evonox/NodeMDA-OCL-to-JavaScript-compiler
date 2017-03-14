
var BooleanLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "BooleanLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = BooleanLiteralExpCodeGenMixin;
