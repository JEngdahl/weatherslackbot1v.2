var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var cheeseBurger = require('request');
var http = require("http");


var port = process.env.PORT || 1337


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.send("SERVER UP!")
})

app.post('/getweather', function(req, response){

  if(req.body.text.length !== 5){
    return response.send("needs a 5 digit zip-code :D")
  }

  if(isNaN(req.body.text)){
    return response.send("needs a 5 digit zip-code :D")
  }

  // if(req.body.text.length < 1){
  //   return response.send("needs a zip-code :D")
  // }
  //http://api.apixu.com/v1/current.json?key=488d3421779b4d6ebd6210605172810&q=33523

  // cheeseBurger.get("http://api.apixu.com/v1/current.json?key=488d3421779b4d6ebd6210605172810&q=33523")
  // .on('response', function(response) {
  //   console.log(response.statusCode) // 200
  //   console.log(response.location) // 'image/png'
  //
  //   res.send(response.location)
  // })

var options = {
  "method": "GET",
  "hostname": "api.apixu.com",
  "port": null,
  "path": `/v1/current.json?key=488d3421779b4d6ebd6210605172810&q=${req.body.text || "33523"}`,
  "headers": {
    "cache-control": "no-cache",
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    // response.send(body)
    // console.log(body.toString());
    body = JSON.parse(body)

    var text = `It is currently ${body.current.temp_f} degrees in ${body.location.name}`
    response.send(text)

  });
})

req.end();




})

app.listen(port, function(){
  console.log(`Server is up on port ${port}`)
})
