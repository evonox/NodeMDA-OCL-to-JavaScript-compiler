const amTypeResolver = require("./AbstractModelTypeResolver");
const unmatchedElementDetector = require("./UnmatchedElementDetecter");

module.exports = {

    validate(umlModel, amModel) {
        amTypeResolver.resolve(umlModel, amModel);
        unmatchedElementDetector.detect(amModel);
    }
}