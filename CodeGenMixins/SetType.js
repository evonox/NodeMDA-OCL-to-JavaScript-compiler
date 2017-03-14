
var SetTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "SetType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = SetTypeCodeGenMixin;
