
var PropertyCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "PropertyCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = PropertyCallExpCodeGenMixin;
