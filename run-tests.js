const fs = require("fs");
const path = require("path");
const fileScanner = require("./helper/FileScanner");
const parser = require("./analysis/parser/OclParser");

fileScanner.scan("./tests/", "ocl", (filePath) => {
    let content = fs.readFileSync(filePath).toString();
    let ast = parser.parse(content, {
        startRule: "oclExpression"
    });

    let outputFileName = path.join("./test-results", path.basename(filePath, ".ocl") + ".ast.txt");
    
    let directory = path.dirname(outputFileName);
    if(fs.existsSync(directory) === false) {
        fs.mkdirSync(directory);
    }
    fs.writeFileSync(outputFileName, JSON.stringify(ast, null, 4));
});