
var TupleLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "TupleLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = TupleLiteralExpCodeGenMixin;
