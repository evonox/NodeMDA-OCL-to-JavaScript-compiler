
var OperationCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "OperationCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = OperationCallExpCodeGenMixin;
