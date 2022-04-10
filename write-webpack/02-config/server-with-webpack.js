const express = require('express');

const webpack = require('webpack')

const middleware = require('webpack-dev-middleware')

const config = require('./webpack.config')

const compiler = webpack(config);

let app = express();

// 使用中间件
app.use(middleware(compiler));

app.get('/api/user', function(req, res) {
    res.json({name: 'fjk'})
})

app.listen(3031, () => {
    console.log('listening on port 3031')
})