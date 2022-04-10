const less = require('less');

function loader(source) {
    console.log('less-loader', source);
    let css = '';
    less.render(source, function(err, result) {
        css = result.css;
    })
    // 需要将 \n 进行转义处理
    css = css.replace(/\n/g, '\\n')
    return css;
}

module.exports = loader;