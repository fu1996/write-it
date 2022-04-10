#! /usr/bin/env node

// 1. 读取配置文件 webpack.config.js

const path = require('path');

let config = require(path.resolve('webpack.config.js'));

// 2. 创建一个类 来负责编译

const Compiler = require('../lib/Compiler.js')

const compiler = new Compiler(config)

compiler.run()