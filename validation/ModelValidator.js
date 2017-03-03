const amTypeResolver = require("./AbstractModelTypeResolver");

module.exports = {

    validate(umlModel, amModel) {
        amTypeResolver.resolve(umlModel, amModel);
    }
}