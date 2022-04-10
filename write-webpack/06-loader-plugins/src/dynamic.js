// console.log('动态导入')
// const newBtn = document.createElement('button')

// newBtn.innerHTML = 'show'

// document.body.appendChild(newBtn)

import React from 'react'
import ReactDom from 'react-dom'
import * as Formik from 'formik'

import state from './store'

console.log('sta', state)

const Test = props => {
    console.log('test', props)
    return (<div>123</div>)
}

const NewText = Formik.connect(Test);

console.log('NewText', NewText)
const Hi = props => {
    console.log('formik', Formik)
    return (
        <div>你好<NewText /></div>
    )
}

export default Hi

ReactDom.render(<Hi />, document.getElementById('dynamic'))