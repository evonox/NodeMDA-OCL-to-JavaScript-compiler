
var OclExpressionCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "OclExpression";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = OclExpressionCodeGenMixin;
