
var BinaryOperatorExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "BinaryOperatorExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = BinaryOperatorExpCodeGenMixin;
