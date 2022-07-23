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
    // 将一个 一个的字符 变为 一套可读的有逻辑的 程序 数据结构
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
    run() {
        console.log('输入的字符是\n' + this.codes);
        const {tokens} = this.tokenize()
        console.log(tokens)
    }
}

module.exports = Magenta;
