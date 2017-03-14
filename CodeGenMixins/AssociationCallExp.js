
var AssociationCallExpCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "AssociationCallExp";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = AssociationCallExpCodeGenMixin;
