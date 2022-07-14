const path =require("path");
module.exports = {
    plugins: [
      [path.resolve(__dirname,'./plugin2.js')],
    ]
  };