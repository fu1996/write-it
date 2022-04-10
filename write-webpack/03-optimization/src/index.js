// console.log('动态导入')
// const newBtn = document.createElement('button')

// newBtn.innerHTML = 'show'

// document.body.appendChild(newBtn)

import React, { createContext, useState } from 'react'
import ReactDom from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import state from './store'

console.log('state', state);

const App = () => {
    const [hasEle, setHasEle] = useState(false)
    const handleClick = () => {
        import('./dynamic?data="1"').then(res => {
            console.log('res', res.default)
            setHasEle(true)
        })
    }
    const initialValues = {
        username: '张三',
        content: '我是内容',
        subject: 'java',
      }
      const handleSubmit = values => {
        console.log(values)
      }
    return (
        <div>
            <button onClick={handleClick}>动态加载和传参</button>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div id="form"></div>
                    <Field name="username" />
                    <ErrorMessage name="username" />
                    <button type="submit">提交</button>
                </Form>
            </Formik>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('root'))