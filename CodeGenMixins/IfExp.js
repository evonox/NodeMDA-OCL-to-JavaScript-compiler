
var IfExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "IfExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = IfExpCodeGenMixin;
