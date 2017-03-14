
var IteratorExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "IteratorExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = IteratorExpCodeGenMixin;
