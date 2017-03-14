
var IterateExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "IterateExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = IterateExpCodeGenMixin;
