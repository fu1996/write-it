// import 'bootstrap/dist/css/bootstrap.css';
// import './a'

let url = ''

if (DEV === 'dev') {
    url = 'https://localhost:3000'
} else {
    url = 'http://baidu.com'
}
console.log('env', ENV)

console.log('uuuel', url)
// console.log('index')


// class Dog {
//     hi() {
//         console.log('hi hhhh 测试webpack监控')
//     }
// }

// console.log('111')

// new Dog().hi();

// const xhr = new XMLHttpRequest();

// xhr.open('GET','/api/user', true);

// xhr.onload = function() {
//     console.log(xhr.response);
// }

// xhr.send();
