const ProgramKeyword = {
    Print: 'print',
    Var: 'var',
}

const TokenTypes = {
    String: "string",
    Print: "print",
    Varchar: "varchar",
    Identifier: "identifier", // 定义
    Operator: "operator", // 运算符
    Expression: "expression", // 使用 变量
}

const OperatorTypes = {
    Eq: '=',
}

class Magenta {
    constructor(codes = '') {
        this.codes = codes;
    }
    // 词法分析 （没加错误处理） 将一个 一个的字符 变为 一套可读的有逻辑的 程序 数据结构
    tokenize() {
        let length = this.codes.length
        console.log(length)
        // 记录当前解析的位置 行号 列号 和 字符串的位置
        let column = 1;
        let line = 1;
        let pos = 0;
        // 允许 的 keyword 的字符
        const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
        // 存储 解析出的 tokens
        const tokens = [];
        // 要一个字 一个字的 解析 使用 while 合适一些
        while (pos < length) {
            let currentChar = this.codes[pos];
            // 判断是不是换行符
            if (currentChar === '\n' || currentChar === ' ') {
                currentChar === '\n' ? line++ : '';
                pos++;
                currentChar === '\n' ? column=1 : column++;
                continue;
            }
            // 进入 字符串的解析逻辑
            if (currentChar === '"') {
                let res = '';
                pos++;
                column++;
                let startPos = column;
                while (varChars.includes(this.codes[pos]) || this.codes[pos] === ' ') {
                    res += this.codes[pos];
                    pos++;
                    column++;
                }
                let endPos = column;
                if (this.codes[pos] === '"') {
                    pos++;
                    column++;
                    tokens.push({
                        type: TokenTypes.String,
                        value: res,
                        startPos,
                        endPos,
                        line,
                        column,
                    })
                }
            } else if (currentChar === '=') {
                let startPos = column;
                pos++;
                column++;
                let endPos = column;
                tokens.push({
                    type: TokenTypes.Operator,
                    value: OperatorTypes.Eq,
                    startPos,
                    endPos,
                    line,
                    column,
                })
            } else if (varChars.includes(currentChar)) {
                // 不是变量
                let res = currentChar;
                let startPos = column;
                pos++;
                column++;
                while (varChars.includes(this.codes[pos])) {
                    res += this.codes[pos];
                    pos++;
                    column++;
                }
                let endPos = column;
                console.log('字符串的解析', res);
                if (res === ProgramKeyword.Print) {
                    tokens.push({
                        type: TokenTypes.Print,
                        value: res,
                        startPos,
                        endPos,
                        line,
                        column,
                    })
                } else if (res === ProgramKeyword.Var) {
                    tokens.push({
                        type: TokenTypes.Varchar,
                        value: res,
                        startPos,
                        endPos,
                        line,
                        column,
                    })
                } else if (tokens[tokens.length - 1].type === TokenTypes.Varchar) {
                    tokens.push({
                        type: TokenTypes.Identifier,
                        value: res,
                        startPos,
                        endPos,
                        line,
                        column,
                    })
                } else {
                    tokens.push({
                        type: TokenTypes.Expression,
                        value: res,
                        startPos,
                        endPos,
                        line,
                        column,
                    })
                }
            }
        }
        return {
            error: false,
            tokens,
        }
    }
    // 语法分析
    parse(tokens = []) {
        console.log(tokens);
        const len = tokens.length;
        let pos = 0;
        // 存储变量的值
        const varObj = {};

        while (pos < len) {
            const currentToken = tokens[pos];
            const {type, value} = currentToken;
            // 判断是否是 print 语法
            if (type === TokenTypes.Print && value === ProgramKeyword.Print) {
                // 是print 语法 取 第二位
                pos++;
                const nextToken = tokens[pos];
                const {type, value} = nextToken;
                // 判断是否是字符串
                if (type === TokenTypes.String) {
                    console.log(value)
                    pos++;
                    continue;
                } else if (type === TokenTypes.Expression) {
                    // 判断是否是变量
                    if (!value in varObj) {
                        // 判断变量是否已经声明
                        return console.log(`变量 ${value}未声明`)
                    }
                    console.log(varObj[value])
                    pos++;
                    continue;
                }

            } else if (type === TokenTypes.Varchar && value === ProgramKeyword.Var) {
                pos++;
                // var 的下一个 token
                const nextToken = tokens[pos];
                const {type: identifierType, value:varKey, column, line} = nextToken
                const isIdentifier = identifierType === TokenTypes.Identifier;
                if (!isIdentifier) {
                    return console.log(`变量 ${varKey}有误，在 ${line}行 ${column}列，请检查`)
                }
                pos++;
                // 判断运算符
                const operatorToken = tokens[pos];
                const {type:operatorType, value:eqValue, column:eqColumn, line:eqLine} = operatorToken;
                const isEqualToken = operatorType === TokenTypes.Operator && eqValue === OperatorTypes.Eq;
                if (!isEqualToken) {
                    return console.log(`运算符 ${eqValue}有误，在 ${eqLine}行 ${eqColumn}列，请检查`)
                }
                pos++;
                // 判断 赋值
                const valueToken = tokens[pos];
                const {type:valueType, value, column:valueColumn, line:valueLine} = valueToken;
                //TODO: 可能存在二次 赋值 判断 此 token 是不是字符串。 上面的 tokenize 为处理 二次赋值的情况
                // var a = "123";
                // var b = a;
                const isString = valueType === TokenTypes.String;
                if (isString) {
                    varObj[varKey] = value;
                    pos++;
                } else if (valueType === TokenTypes.Expression) {
                    if (!value in varObj) {
                        return console.log(`变量 ${varKey}未定义，在 ${valueLine}行 ${valueColumn}列，请检查`)
                    }
                    const realValue = varObj[value]
                    varObj[varKey] = realValue;
                    pos++;
                } else {
                    console.log(`未知的变量${varKey}`)
                    break;
                }
            }
        }

    }
    run() {
        console.log('输入的字符是\n' + this.codes);
        const {tokens} = this.tokenize()
        this.parse(tokens);
    }
}

module.exports = Magenta;
