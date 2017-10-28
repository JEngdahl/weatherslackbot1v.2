var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.send("SERVER UP!")
})

app.post('/getweather', function(req, res){
  res.send("got the request!")
})

app.listen(port, function(){
  console.log(`Server is up on port ${port}`)
})
