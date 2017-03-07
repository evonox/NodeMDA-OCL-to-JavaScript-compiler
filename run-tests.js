const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const fileScanner = require("./helper/FileScanner");
const parser = require("./analysis/parser/OclParser");

fileScanner.scan("./tests/", "ocl", (filePath) => {
    let content = fs.readFileSync(filePath).toString();

    let ast = null;
    try {
        ast = parser.parse(content, {
            startRule: "oclExpression"
        });
    } catch(e) {
        console.log(`Error in file ${filePath}:`);
        console.dir(e);
        return;
    }
    

    let outputFileName = path.join("./test-results", path.dirname(filePath), path.basename(filePath, ".ocl") + ".ast.txt");
    
    let directory = path.dirname(outputFileName);
    if(fs.existsSync(directory) === false) {
        shell.mkdir("-p", directory);
    }
    fs.writeFileSync(outputFileName, JSON.stringify(ast, null, 4));
});