var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var cheeseBurger = require('request')

var port = process.env.PORT || 1337


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.send("SERVER UP!")
})

app.post('/getweather', function(req, res){

  //http://api.apixu.com/v1/current.json?key=488d3421779b4d6ebd6210605172810&q=33523

  cheeseBurger.get("http://api.apixu.com/v1/current.json?key=488d3421779b4d6ebd6210605172810&q=33523")
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response) // 'image/png'
  })

  res.send("got the request!")
})

app.listen(port, function(){
  console.log(`Server is up on port ${port}`)
})
