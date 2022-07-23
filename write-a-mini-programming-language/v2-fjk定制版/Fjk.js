const PrintStr = "输出";

const TokenTypes = {
    String: "string",
    Print: "print",
    Varchar: "varchar",
}

class Fjk {
    constructor(codes) {
        this.codes = codes;
    }
    // 词法解析
    tokenize() {
        const length = this.codes.length;
        // 记录当前 解析的 位置
        let pos = 0;
        let tokens = [];
        const BUILT_IN_KEYWORDS = [PrintStr];
        // 允许 的 keyword 的字符
        const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_' + PrintStr;
        while (pos < length) {
            let currentChar = this.codes[pos];
            // 如果 当前解析的字符是 空格 或者 换行 则 继续
            if (currentChar === ' ' || currentChar === '\n') {
                pos++;
                continue;
            } else if (currentChar === '"') {
                // 如果当前的 是字符 "
                // 记录当前 包裹的内容
                let res = "";
                pos++;
                // 指针 移动 进行累加
                while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
                    // 此处的判断是为了 提取出 ”“ 包含的文本字符
                    res += this.codes[pos];
                    pos++;
                }
                // 可能存在语法错误 循环结束 依然 没有发现 " 作为结尾
                if (this.codes[pos] !== '"') {
                    return {
                        error: '错误的语法，在pos' + pos
                    }
                }
                pos++
                // 当前解析的语法结果放入 token 里
                tokens.push({
                    type: 'string',
                    value: res,
                })
            } else if (varChars.includes(currentChar)) {
                // 存储当前的 字符串信息
                let res = currentChar;
                pos++
                // 当 当前解析的字符是 普通字符时候
                while (varChars.includes(this.codes[pos]) && pos < length) {
                    res += this.codes[pos];
                    pos++;
                }
                // 如果 res 不是内置关键字的话
                if (!BUILT_IN_KEYWORDS.includes(res)) {
                    return {
                        error: `语法错误：${res},位置在：${pos}`
                    }
                }
                // 存入 tokens
                tokens.push({
                    type: TokenTypes.Print,
                    value: res
                })
            } else {
                return {
                    error: `错误的字符： ${this.codes[pos]}`
                }
            }
        }
        return {
            error: false,
            tokens,
        }
    }
    // 语法解析
    parse(tokens) {
        const len = tokens.length;
        let pos = 0;
        while (pos < len) {
            const currentToken = tokens[pos];
            // 如果是 PrintStr 关键字 也就是 `输出`
            if (currentToken.type === TokenTypes.Print && currentToken.value === PrintStr) {
                // 如果下一个 currentToken 不存在
                if (!tokens[pos + 1]) {
                    return console.log('当前行错误，期望的是字符串' + pos);
                }
                // 校验下一个 currentToken 是否是 字符串
                let isString = tokens[pos + 1].type === 'string';
                if (!isString) {
                    return console.log(`currentToken 解析错误 ${tokens[pos + 1].type}，期望的是字符串`)
                }
                // 语法没有错误 输出
                console.log('\x1b[35m%s\x1b[0m', tokens[pos + 1].value);
                // pos 的位置增加2，2 代表的 是 PrintStr 一个 currentToken 字符串 一个 currentToken
                pos+= 2
            } else {
                return console.log(`未匹配的token ${currentToken.type}`)
            }
        }
    }
    run() {
        console.log(this.codes);
        const {
            tokens,
            error,
        } = this.tokenize();
        if (error) {
            console.log(error);
            return
        }
        console.log(tokens);
        this.parse(tokens)
    }
}

module.exports = Fjk;
