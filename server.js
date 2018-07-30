// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp", function(req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toGMTString()
  });
});

// your first API endpoint... 
app.get("/api/timestamp/:date", function (req, res) {
  console.log(req.params.date);
  const userInput = req.params.date;
  const date = new Date(userInput);
  if (date != "Invalid Date") {
    res.json({
      unix: date.getTime(),
      utc: date.toGMTString()
    });
  } else {
    res.json({error: 'Invalid Date'});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});