
var NavigationCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "NavigationCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = NavigationCallExpCodeGenMixin;
