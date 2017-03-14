
var UnspecifiedValueExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "UnspecifiedValueExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = UnspecifiedValueExpCodeGenMixin;
