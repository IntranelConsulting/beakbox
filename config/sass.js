const fs = require("fs-extra");
const sass = require("sass");
const isProd = process.env.NODE_ENV === "production";

module.exports = (name) => {
    const result = sass.renderSync({
        file: `./src/scss/${name}.scss`,
        outputStyle: isProd ? "compressed" : "expanded",
        sourceMap: isProd ? false : `${name}.css.map`,
    });

    fs.ensureDirSync("./dist/css");
    fs.writeFileSync(`./dist/css/${name}.css`, result.css);
    if (!isProd) {
        fs.writeFileSync(`./dist/css/${name}.css.map`, result.map);
    }
};