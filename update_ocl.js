const fs = require("fs");
const path = require("path");

const alfFiles = fs.readdirSync("./ocl/").filter(file => file.endsWith(".js"));

alfFiles.every( (filename) => {
    let className = path.basename(filename, ".js");
    if(className == "ocl") return true;
    processFile("./ocl/" + filename);
    return true;
});

function processFile(file) {
    let content = fs.readFileSync(file).toString();
    let baseClasses = /extends[^{]*{/.exec(content)[0];
    baseClasses = baseClasses.substring(7);
    baseClasses = baseClasses.substring(0, baseClasses.length - 1);
    baseClasses = baseClasses.trim().split(",").map(s => s.trim());

    content = prepareRequire(baseClasses) + content;

    let bcContent = "extends codeGenMixin(" + prepareMixin(baseClasses) + ") {";
    content = content.replace(/extends[^{]*{/, bcContent);
    fs.writeFileSync(file, content);
}

function prepareRequire(baseClasses) {
    if(baseClasses.length === 1 && baseClasses[0] === "Object") return "";
    let content = "";
    baseClasses.every((bc) => {
        content += `const ${bc} = require("./${bc}");\n`;
        return true;
    });
    return content;
}

function prepareMixin(bc) {
    if(bc.length === 1) return bc[0];
    let base = bc[0];
    let mixin = null;
    if(bc.length === 2) {
        mixin = bc[1];
    } else {
        mixin = prepareMixin(bc.slice(1));
    }
    return `mixin(${base}, ${mixin})`;
}