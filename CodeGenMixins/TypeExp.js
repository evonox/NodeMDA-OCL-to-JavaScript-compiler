
var TypeExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "TypeExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = TypeExpCodeGenMixin;
