const NodeMDA = require('nodemda');
const compilerAPI = require("./CompilerAPI");

// DEBUG - these values should be in configuration, needs to be thought of how
const oclSourceDir = ".";

console.dir(NodeMDA);

function loadUmlModel() {
    return NodeMDA.Meta.Reader.getMeta(NodeMDA.Options.modelFileName);
}

function run() {
    console.log("Loading UML model...");
    let umlModel = loadUmlModel();
    console.log("UML model has been loaded.");

    console.log("Starting OCL compiler...");
    compilerAPI.parseOCL(oclSourceDir);
    compilerAPI.validate(umlModel);
    compilerAPI.generateCode(NodeMDA.Options.output);
    console.log("OCL compilation finished.");
}

module.exports = {
    run: run
}


