
var NumericLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "NumericLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = NumericLiteralExpCodeGenMixin;
