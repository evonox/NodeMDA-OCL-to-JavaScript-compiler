
var LetExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "LetExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = LetExpCodeGenMixin;
