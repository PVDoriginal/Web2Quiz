var http = require('http');
const express = require('express')
const app = express()
const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', function(req, res){
   res.sendFile(`${__dirname}/content/login.html`);
});

app.get('/login.js', function (req, res) {
  res.sendFile(`${__dirname}/content/login.js`);
});

app.get('/login.css', function (req, res) {
  res.sendFile(`${__dirname}/content/login.css`);
});