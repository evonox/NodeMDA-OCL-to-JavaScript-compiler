
var TupleLiteralTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "TupleLiteralType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = TupleLiteralTypeCodeGenMixin;
