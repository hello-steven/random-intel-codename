// server.js
// where your node app starts

// init project
var express = require('express');
//import jsdom from 'jsdom';
import jsdom from 'jsdom';
import axios from 'axios';
import createwikiPage from './wikiPageData'

export default () => {

  const wikiServices = {
    axios: axios,
    jsdom: jsdom.JSDOM
  };

  let wikiPageAPI = createwikiPage(wikiServices)();

  var app = express();
  app.set('etag', false);
  // we've started you off with Express,
  // but feel free to use whatever libs or frameworks you'd like through `package.json`.

  // http://expressjs.com/en/starter/static-files.html
  app.use(express.static('public'));

  // http://expressjs.com/en/starter/basic-routing.html
  app.get("/name", function (req, res) {
    // response.sendFile(__dirname + '/views/index.html');
    //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    wikiPageAPI.createGetName()
      .then(name => {
        res.send(name)
      });
  });

  // listen for requests :)
  var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + server.address().port);
  });
  return server;
}
