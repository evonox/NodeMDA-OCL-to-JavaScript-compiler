
var AttributeCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "AttributeCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = AttributeCallExpCodeGenMixin;
