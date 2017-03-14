
var LiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "LiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = LiteralExpCodeGenMixin;
