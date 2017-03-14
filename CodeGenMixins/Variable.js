
var VariableCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "Variable";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = VariableCodeGenMixin;
