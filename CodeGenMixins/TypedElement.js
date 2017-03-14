
var TypedElementCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "TypedElement";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = TypedElementCodeGenMixin;
