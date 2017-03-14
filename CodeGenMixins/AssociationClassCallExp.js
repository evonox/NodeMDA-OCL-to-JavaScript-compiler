
var AssociationClassCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "AssociationClassCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = AssociationClassCallExpCodeGenMixin;
