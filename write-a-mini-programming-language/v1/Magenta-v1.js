class Magenta {
    constructor(codes) {
        this.codes = codes;
    }
    // 词法解析
    tokenize() {
        const length = this.codes.length;
        // 记录当前 解析的 位置
        let pos = 0;
        let tokens = [];
        const BUILT_IN_KEYWORDS = ['print'];
        // 允许 的 keyword 的字符
        const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
        while (pos < length) {
            let currentChar = this.codes[pos];
            // 如果 当前解析的字符是 空格 或者 换行 则 继续
            if (currentChar === ' ' || currentChar === '\n') {
                pos++;
                continue;
            } else if (currentChar === '"') {
                // 如果当前的 是字符 "
                let res = "";
                pos++;
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
                let res = currentChar;
                pos++
                // 当 当前解析的字符是 普通字符时候
                while (varChars.includes(this.codes[pos]) && pos < length) {
                    res += this.codes[pos];
                    pos++;
                }
                // 如果 不是内置关键字的话
                if (!BUILT_IN_KEYWORDS.includes(res)) {
                    return {
                        error: `语法错误：${res},位置在：${pos}`
                    }
                }
                tokens.push({
                    type: "keyword",
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
            const token = tokens[pos];
            // 如果是 print 关键字
            if (token.type === "keyword" && token.value === "print") {
                // 如果下一个 token 不存在
                if (!tokens[pos + 1]) {
                    return console.log('当前行错误，期望的是字符串' + pos);
                }
                // 校验下一个 token 是否是 字符串
                let isString = tokens[pos + 1].type === 'string';
                if (!isString) {
                    return console.log(`token 解析错误 ${tokens[pos + 1].type}，期望的是字符串`)
                }
                // 语法没有错误 输出
                console.log('\x1b[35m%s\x1b[0m', tokens[pos + 1].value);
                // pos 的位置增加2，2 代表的 是 print 一个 token 字符串 一个 token
                pos+= 2
            } else {
                return console.log(`未匹配的token ${token.type}`)
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

module.exports = Magenta;
