
var VariableExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "VariableExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = VariableExpCodeGenMixin;
