const fs = require("fs");
const path = require('path');
const hb = require('handlebars');
const winston = require("winston");
const fileScanner = require("../helper/FileScanner");

const templateDir = "../templates"; 
const partialExtension = ".hbs";

// scans partials in files
function scanForPartials() {
    winston.verbose("Loading Handlebars partials from file system...");
    let directory = path.join(__dirname, templateDir);
    fileScanner.scan(directory, partialExtension, filePath => {
        winston.debug(`Reading partial file '${filePath}'...`)
        var content = fs.readFileSync(filePath).toString();
        var partialName = path.basename(filePath, partialExtension);
        winston.verbose(`Registering partial template '${partialName}'...`);
        hb.registerPartial(partialName, content);
    });
    winston.verbose("Handlebars partials have been successfully loaded.\n");
}

// registers various helpers
// TODO - Code clean up
function registerHelpers() {
    hb.registerHelper("switch", function(value, options) {
        this._switch_value_ = value;
        var html = options.fn(this); // Process the body of the switch block
        delete this._switch_value_;
        return html;
    });

    hb.registerHelper("case", function(value, options) {
        if (value == this._switch_value_) {
            return options.fn(this);
        }
    });

    hb.registerHelper("x", function(expression, options) {
        var result;

        // you can change the context, or merge it with options.data, options.hash
        var context = this;

        // yup, i use 'with' here to expose the context's properties as block variables
        // you don't need to do {{x 'this.age + 2'}}
        // but you can also do {{x 'age + 2'}}
        // HOWEVER including an UNINITIALIZED var in a expression will return undefined as the result.
        with(context) {
            result = (function() {
            try {
                return eval(expression);
            } catch (e) {
                console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
            }
            }).call(context); // to make eval's lexical this=context
        }
        return result;
    });

    hb.registerHelper("xif", function(expression, options) {
        return hb.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
    });
}

module.exports = {
    initTemplates: function() {
        registerHelpers();
        scanForPartials();
    }
}
