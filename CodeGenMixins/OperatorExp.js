
var OperatorExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "OperatorExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = OperatorExpCodeGenMixin;
