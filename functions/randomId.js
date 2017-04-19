
let alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'


const randomId = () =>{
let num = ''
for(let i =0; i < 5; i++){
let random = Math.floor(Math.random() * alpha.length)
num+= alpha[random]
}
return num
}
module.exports =  randomId
