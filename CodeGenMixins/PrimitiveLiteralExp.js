
var PrimitiveLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "PrimitiveLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = PrimitiveLiteralExpCodeGenMixin;
