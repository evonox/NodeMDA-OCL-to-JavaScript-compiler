
var ClassCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "Class";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = ClassCodeGenMixin;
