import * as React from 'react';

console.log(`111 ${true ? '我是正确的' :'我是false的'}`)

class B extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">Hello kiwi 🐤 点击切换语言</p>
        <div className="btns">
          <span className="btn" onClick={this.changeLang.bind(this, 'zh-CN')}>
            中文简体
          </span>
          <span className={`${true ? '哈哈' : '你好'}`} onClick={this.changeLang.bind(this, 'en-US')}>
            English
          </span>
          <span className="btn" onClick={this.changeLang.bind(this, 'zh-TW')}>
            中文繁体
          </span>
        </div>
        <br />
        <p>
          <span>{I18N.common.test}</span>
        </p>
      </div>
    );
  }
}

export default B;
