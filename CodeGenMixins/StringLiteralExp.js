
var StringLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "StringLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = StringLiteralExpCodeGenMixin;
