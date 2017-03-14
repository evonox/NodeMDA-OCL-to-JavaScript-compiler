
var IntegerLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "IntegerLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = IntegerLiteralExpCodeGenMixin;
