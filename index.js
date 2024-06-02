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

app.get('/audio/audio-s1.mp3', function(req, res){
  res.sendFile(`${__dirname}/audio/audio-s1.mp3`);
});
app.get('/audio/audio-s2.mp3', function(req, res){
  res.sendFile(`${__dirname}/audio/audio-s2.mp3`);
});
app.get('/audio/audio-s3.mp3', function(req, res){
  res.sendFile(`${__dirname}/audio/audio-s3.mp3`);
});
app.get('/audio/audio-s4.mp3', function(req, res){
  res.sendFile(`${__dirname}/audio/audio-s4.mp3`);
});


app.get('/main.html', function (req, res) {
  res.sendFile(`${__dirname}/content/main.html`);
  res.send
});

app.get('/main.js', function (req, res) {
  res.sendFile(`${__dirname}/content/main.js`);
  res.send
});

app.get('/main.css', function (req, res) {
  res.sendFile(`${__dirname}/content/main.css`);
});

app.get('/404.css', function (req, res) {
  res.sendFile(`${__dirname}/content/404.css`);
});

var access_code;

app.get('/quotes.json', function(req, res){
  res.sendFile(`${__dirname}/content/quotes.json`)
});
app.get('/login.html', function(req, res){
  res.sendFile(`${__dirname}/content/login.html`)
});

app.post('/form-submit', function(req, res) {
  console.log(req.body);
  let name = req.body.fname + "_" + req.body.lname;

  if (fs.existsSync(`users/${name}.json`)){
      res.status(500).send({ error: 'User already exists!' });
  }
  fs.writeFile(`users/${name}.json`, JSON.stringify(req.body), (error) => {
    if (error) throw error;
  });
  res.status(200).send({ error: 'Created new user!' , access_code: access_code});
});

app.post('/user-login', function(req, res){
  let name = req.body.fname + "_" + req.body.lname;

  if (!fs.existsSync(`users/${name}.json`)){
    res.status(500).send({ error: 'User doesn\'t exist!' });
  }
    
  var user = JSON.parse(fs.readFileSync(`users/${name}.json`, 'utf8'));
  
  if(user["pass"] != req.body.pass){
    res.status(500).send({ error: 'Wrong password!' });
  }

  res.status(200).send({error: 'Logged In!', highscore: user["highscore"]});
});

app.post('/update-score', function(req, res){
  let name = req.body.fname + "_" + req.body.lname;
  var user = JSON.parse(fs.readFileSync(`users/${name}.json`, 'utf8'));

  if(req.body.highscore > user["highscore"]) user["highscore"] = req.body.highscore;

  fs.writeFile(`users/${name}.json`, JSON.stringify(user), (error) => {
    if (error) throw error;
  });

  console.log("updated score: " + req.highscore);
  res.end();
});

app.get('/content/images/sipos1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/sipos1.jpg`);
});
app.get('/content/images/sipos2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/sipos2.jpg`);
});
app.get('/content/images/sipos3.jpeg', function(req, res){
  res.sendFile(`${__dirname}/content/images/sipos3.jpeg`);
});
app.get('/content/images/sipos4.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/sipos4.jpg`);
});
app.get('/content/images/rusu1.jpeg', function(req, res){
  res.sendFile(`${__dirname}/content/images/rusu1.jpeg`);
});
app.get('/content/images/rusu2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/rusu2.jpg`);
});
app.get('/content/images/cezara1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/cezara1.jpg`);
});
app.get('/content/images/cezara2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/cezara2.jpg`);
});
app.get('/content/images/cezara3.jpeg', function(req, res){
  res.sendFile(`${__dirname}/content/images/cezara3.jpeg`);
});
app.get('/content/images/cezara4.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/cezara4.jpg`);
});
app.get('/content/images/cezara5.png', function(req, res){
  res.sendFile(`${__dirname}/content/images/cezara5.png`);
});
app.get('/content/images/cezara6.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/cezara6.jpg`);
});
app.get('/content/images/paun1.jpeg', function(req, res){
  res.sendFile(`${__dirname}/content/images/paun1.jpeg`);
});
app.get('/content/images/paun2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/paun2.jpg`);
});
app.get('/content/images/paun3.jpeg', function(req, res){
  res.sendFile(`${__dirname}/content/images/paun3.jpeg`);
});
app.get('/content/images/paun4.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/paun4.jpg`);
});

app.get('/content/images/moisil1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/moisil1.jpg`);
});
app.get('/content/images/moisil2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/moisil2.jpg`);
});
app.get('/content/images/moisil3.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/moisil3.jpg`);
});
app.get('/content/images/moisil4.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/moisil4.jpg`);
});
app.get('/content/images/moisil5.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/moisil5.jpg`);
});
app.get('/content/images/sfetcu1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/sfetcu1.jpg`);
});
app.get('/content/images/negru1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/negru1.jpg`);
});
app.get('/blackscreen.png', function(req, res){
  res.sendFile(`${__dirname}/blackscreen.png`);
});

app.get('/congrats.mp3', function(req, res){
  res.sendFile(`${__dirname}/congrats.mp3`);
});

app.get('/wrong.mp3', function(req, res){
  res.sendFile(`${__dirname}/wrong.mp3`);
});

app.get('/images/pc.png', function(req, res){
  res.sendFile(`${__dirname}/pc.png`);
});
app.get('/file.png', function(req, res){
  res.sendFile(`${__dirname}/file.png`);
});

app.get('/images/server.png', function(req, res){
  res.sendFile(`${__dirname}/server.png`);
});

app.get('/bg1.jpeg', function(req, res){
  res.sendFile(`${__dirname}/bg1.jpeg`);
});

app.get('/content/images/hirica1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/hirica1.jpg`);
});
app.get('/content/images/hirica2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/hirica2.jpg`);
});
app.get('/content/images/hirica3.jpeg', function(req, res){
  res.sendFile(`${__dirname}/content/images/hirica3.jpeg`);
});
app.get('/content/images/dumitran1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/dumitran1.jpg`);
});
app.get('/content/images/dumitran2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/dumitran2.jpg`);
});
app.get('/content/images/dumitran3.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/dumitran3.jpg`);
});
app.get('/content/images/dobrovat1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/dobrovat1.jpg`);
});
app.get('/content/images/leustean1.png', function(req, res){
  res.sendFile(`${__dirname}/content/images/leustean1.png`);
});
app.get('/content/images/leustean2.png', function(req, res){
  res.sendFile(`${__dirname}/content/images/leustean2.png`);
});
app.get('/content/images/stalin1.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/stalin1.jpg`);
});
app.get('/content/images/stalin2.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/stalin2.jpg`);
});
app.get('/content/images/stalin3.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/stalin3.jpg`);
});
app.get('/content/images/stalin4.jpg', function(req, res){
  res.sendFile(`${__dirname}/content/images/stalin4.jpg`);
});
app.get('/404.png', function(req, res){
  res.sendFile(`${__dirname}/404.png`);
});



app.use(function(req, res) {
  res.status(404);
  res.sendFile(`${__dirname}/content/404.html`);
});