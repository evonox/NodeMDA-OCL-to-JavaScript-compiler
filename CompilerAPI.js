const oclFileScanner = require("./helper/OclSourceFileScanner");
const parser = require("./analysis/OclParserFacade");
const validator = require("./validation/ModelValidator");
const concreteModelBuilder = require("./domain/ConcreteModelBuilder")
const compiler = require("./synthesis/OutputCodeGenerator"); 

// Loads HandleBars engine templates and registers used helpers
compiler.initTemplates();

// AbstractModel and ConcreteModel references
let amModel = null;
let cmModel = null;

module.exports = {

    // This operation scans for OCL files in given directory and parses them into AbstractModel
    parseOCL: function(oclDirPath) {
        oclSourceCode = oclFileScanner.loadOclFiles(oclDirPath);

        // Set "true" value in the second param to generate ast.txt file with JSON-stringified version of AST
        // It is used for DEBUG purposes
        // For release version, omit this param, then it will be set to default value "false"
        amModel = parser.parse(oclSourceCode, true);   
        return amModel;
    },

    // This operation after parsing performs necessary validations of OCL constraints
    validate: function(umlModel) {
        validator.validate(umlModel, amModel);
    },

    // This operation generates ConcreteModel out of AbstractModel which is then used to generate all
    // the code expressed by included HandleBars templates
    generateCode: function(outputDir, fileExtension = "js") {
        // build the concrete model
        cmModel = concreteModelBuilder.build(amModel);

        // run the code generation process
        fileExtension = fileExtension[0] === "." ? fileExtension : "." + fileExtension;
        compiler.generateCode(cmModel, outputDir, fileExtension);
    }
}
