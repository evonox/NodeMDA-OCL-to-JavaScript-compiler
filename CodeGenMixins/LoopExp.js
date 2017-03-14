
var LoopExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "LoopExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = LoopExpCodeGenMixin;
