// server.js
// where your node app starts

// init project
var express = require('express');
const cheerio = require('cheerio');
import axios from 'axios';
import createwikiPage from './wikiPageData'

export default () => {

  const wikiServices = {
    axios: axios,
    cheerio: cheerio
  };

  let wikiPageAPI = createwikiPage(wikiServices)();

  var app = express();
  // we've started you off with Express,
  // but feel free to use whatever libs or frameworks you'd like through `package.json`.

  // http://expressjs.com/en/starter/static-files.html
  app.use(express.static('public'));

  // http://expressjs.com/en/starter/basic-routing.html
  app.get("/", function (request, response) {
    // response.sendFile(__dirname + '/views/index.html');
    //getWikiPage();
    wikiPageAPI
      .then(res => response.send(res));
  });

  // listen for requests :)
  var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + server.address().port);
  });
  return server;
}
