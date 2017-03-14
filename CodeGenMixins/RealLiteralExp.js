
var RealLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "RealLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = RealLiteralExpCodeGenMixin;
