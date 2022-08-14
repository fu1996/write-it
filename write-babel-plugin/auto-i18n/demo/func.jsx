
const a = `${true ? '我是正确的' : '我是错误的'}`
const b = true ? '不带模板字符串的正确' : '不带模板字符串的错误';
const params = '我是参数'

const Demo = () => {
    return (
        <div>
            {'情况一：我是中文的'}
            <div onClick={() => console.log('情况二：我是在jsx prop里的')}>
                你好
            </div>
            {a}
            <div>
                {`我是需要传参的${b}`}
            </div>
            {/* 要带jsx 的 */}
            <input value="你好啊" />
            {
                /*i18n-disable*/我是不被翻译的
            }
            {`我是取参数的${params + a}`}
        </div>
    )
}