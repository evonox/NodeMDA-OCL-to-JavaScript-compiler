const fs = require("fs");
const path = require("path");

const alfFiles = fs.readdirSync("./ocl/").filter(file => file.endsWith(".js"));



// generate require statements
alfFiles.every( (filename) => {
    let className = path.basename(filename, ".js");
    if(className == "ocl") return true;
    let mixinContent = `
var ${className}CodeGenMixin = (Base) => class extends Base {

    getType() {
        return "${className}";
    }

    genJson() {
        let json = Object.assign(super.genJson());
        json.type = "";

        

        return json;
    }
}

module.exports = ${className}CodeGenMixin;
`
    let mixinFileName = path.join("./CodeGenMixins", className + ".js");
    fs.writeFileSync(mixinFileName, mixinContent);
    return true;
});