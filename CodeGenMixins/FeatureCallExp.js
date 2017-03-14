
var FeatureCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "FeatureCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = FeatureCallExpCodeGenMixin;
