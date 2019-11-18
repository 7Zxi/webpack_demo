import 'style/common';
import 'lib/common';
import '../css/home'
import $ from 'jquery';

console.log('this is home page');

let image = document.createElement('img');
image.src = require('publicImage/3.jpg');
document.body.appendChild(image);

class Qzx {
    constructor(str){
        this.str = str;
        this.print()
    }

    print(){
        console.log(`hi,${this.str}`)
    }

}

let qzx = new Qzx('qzx');
console.log(qzx);

let promise = (number)=>{
    return new Promise((resolve, reject)=>{
        if(number > 5){
            resolve('true')
        }else{
            reject('false')
        }
    })
};
promise(10).then(value=>{
    console.log(value)
}).catch(value => {
    console.log(value)
});

