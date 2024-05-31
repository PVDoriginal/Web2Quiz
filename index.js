var http = require('http');
const express = require('express')
const cors = require('cors')
const fs = require("fs");
const app = express()
const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use(cors());
app.use(express.urlencoded({
  extended: false,
  limit: 10000, 
  parameterLimit: 10,
}));

app.get('/', function(req, res){
   res.sendFile(`${__dirname}/content/login.html`);
});

app.get('/login.js', function (req, res) {
  res.sendFile(`${__dirname}/content/login.js`);
  res.send
});

app.get('/login.css', function (req, res) {
  res.sendFile(`${__dirname}/content/login.css`);
});

app.get('/kahoot.mp3', function(req, res) {
  res.sendFile(`${__dirname}/kahoot.mp3`);
});

var access_code; 

app.post('/form-submit', function(req, res) {
  console.log(req.body);
  let name = req.body.fname + "_" + req.body.lname;

  if (fs.existsSync(`users/${name}.json`)){
      res.status(500).send({ error: 'User already exists!' });
  }
  fs.writeFile(`users/${name}.json`, JSON.stringify(req.body), (error) => {
    if (error) throw error;
  });
  access_code = (Math.random() + 1).toString(36).substring(4);
  console.log("code: " + access_code);
  res.status(200).send({ error: '' , access_code: access_code});
});

