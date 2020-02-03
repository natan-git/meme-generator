'use strict'

const getDiff=(num1,num2)=>{
    return num2-num1
}


const saveToStorage=(key, value)=> {
    let str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

const loadFromStorage=(key, defaultValue)=> {
    let str = localStorage.getItem(key);
    return str ? JSON.parse(str) : defaultValue
}
const getRandomNumber=(max)=> {
    return Math.floor(Math.random() * max);
}

const getRandomID=()=> {
    var chars = 'pioutewqssfghjklmnbvcxz'
    var id = ''
    for (let i = 0; i < 10; i++) {
        id += chars[getRandomNumber(chars.length)]
    }
    return id;
}