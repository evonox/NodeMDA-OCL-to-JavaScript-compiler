
var TemplateParameterTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "TemplateParameterType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = TemplateParameterTypeCodeGenMixin;
