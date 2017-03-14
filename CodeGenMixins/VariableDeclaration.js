
var VariableDeclarationCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "VariableDeclaration";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = VariableDeclarationCodeGenMixin;
