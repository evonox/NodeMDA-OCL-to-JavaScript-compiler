
var SequenceTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "SequenceType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = SequenceTypeCodeGenMixin;
