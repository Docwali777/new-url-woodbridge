const randomId = require('./functions/randomid.js')
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
const URL = require('./Schemas/urlSchema.js')
let {Schema} = mongoose
const app = express()

// let alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
//
//
// const randomId =() =>{
// let num = ''
// for(let i =0; i < 5; i++){
// let random = Math.floor(Math.random() * alpha.length)
// num+= alpha[random]
// }
// return num
// }



var url = ' '
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


// 'mongodb://admin:admin2017@ds139989.mlab.com:39989/new-url-woodbridge'

var url = 'mongodb://admin:admin2017@ds139989.mlab.com:39989/new-url-woodbridge';

if(process.env.NODE_ENV === 'production'){
  url = process.env.MONGODB_URI
}



mongoose.connect(url)

mongoose.connection.on('connected', (err)=>{
  if(err){console.log('not connected')}
  console.log('connected to mongoLAB')
})


app.get('/', (req, res)=>{
    res.render('index', {
      url: ' ',
      id: ' '
    })

})

app.post('/new', (req, res)=>{
url = req.body.url
let randomNumber = randomId()
if(url !== ''){

  var newURL = URL({
    url: req.body.url,
    id: randomNumber
  }).save((err)=>{
    if(err) throw err
    console.log('newUrl created')
  })
  console.log(req.headers.origin)
  res.render('index', {
    url,
    id: `${req.headers.origin}/new/${randomNumber}`
  })
} else {
    res.send('Please provide URL')
}
})

app.get('/new/:data', (req, res, next)=>{
  let url = req.params.data

URL.findOne({id: url}, (err, url)=>{
  if(err)
  {console.log(err)}
  else {
    res.redirect(url.url)
    next
  }



})

})

app.listen(PORT, ()=>{
  console.log(`PORT ${PORT}`);
})
