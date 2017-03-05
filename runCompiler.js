const NodeMDA = require('nodemda');
const winston = require("winston");
winston.level = "verbose";
const compilerAPI = require("./CompilerAPI");

// DEBUG - these values should be in configuration, needs to be thought of how
const oclSourceDir = ".";

function loadUmlModel() {
    return NodeMDA.Meta.Reader.getMeta(NodeMDA.Options.modelFileName);
}

function run() {
    winston.info("Loading UML model...");
    let umlModel = loadUmlModel();
    winston.info("UML model has been loaded.\n");

    winston.info("Starting OCL compiler...");
    compilerAPI.parseOCL(oclSourceDir);
    compilerAPI.validate(umlModel);
    compilerAPI.generateCode(NodeMDA.Options.output);
    winston.info("OCL compilation finished.\n");
}

module.exports = {
    run: run
}


