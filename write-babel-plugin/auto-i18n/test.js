const babel = require("@babel/core");
const path = require("path");
const fs = require("fs");

// 导入 index.js 的代码 并使用 插件 plugin2 转换
babel.transformFileAsync('./demo/1.jsx', {
// babel.transformFileAsync('./demo/sourceCode.js', {
    // plugins: [path.join(__dirname,'./plugin2.js')],
    // plugins: [path.join(__dirname,'./delete-console-plugin.js')],
    // plugins: [path.join(__dirname,'./foo-bar-plugin.js')],
    plugins: ['@babel/plugin-syntax-jsx', [path.join(__dirname,'./index.js'), {targetPackage: 'intl', disableCode: 'i18n-disable'}], ],
}).then(res => {
    console.log(res.code);
    // 转换后的代码 写入 dist.js 文件
    fs.writeFileSync(path.join(__dirname,'./dist.js'), res.code, {encoding: 'utf8'});
})