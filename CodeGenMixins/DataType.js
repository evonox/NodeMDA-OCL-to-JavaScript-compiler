
var DataTypeCodeGenMixin = (Base) => class extends Base {

    getType() {
        return "DataType";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = DataTypeCodeGenMixin;
