const fs = require("fs");
const fileScanner = require("./FileScanner");

const oclFileExtension = ".ocl";

class OclFileReader {

    constructor() {
        this.oclSourceCode = "";
    }

    scanOclFiles(rootOclDir) {
        fileScanner.scan(rootOclDir, oclFileExtension, (filePath) => {
            console.log(`Loading OCL file '${filePath}'...`);
            let fileContent = fs.readFileSync(filePath).toString();
            this.appendOclSource(fileContent);
        });
    }

    getOclSourceCode() {
        return this.oclSourceCode;
    }

    appendOclSource(fileContent) {
        this.oclSourceCode += " " + fileContent;
    }
}

module.exports = {
    
    loadOclFiles: function(oclRootDir) {
        let oclFileReader = new OclFileReader();
        oclFileReader.scanOclFiles(oclRootDir);
        return oclFileReader.getOclSourceCode();
    }
}