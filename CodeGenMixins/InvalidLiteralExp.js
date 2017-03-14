
var InvalidLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "InvalidLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = InvalidLiteralExpCodeGenMixin;
