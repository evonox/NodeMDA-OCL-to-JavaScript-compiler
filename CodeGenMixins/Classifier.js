
var ClassifierCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "Classifier";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = ClassifierCodeGenMixin;
