
var UnlimitedNaturalLiteralExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "UnlimitedNaturalLiteralExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = UnlimitedNaturalLiteralExpCodeGenMixin;
