
var CallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "CallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = CallExpCodeGenMixin;
