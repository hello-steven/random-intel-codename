var express = require('express');
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
  app.use(express.static('public'));

  app.get("/name", function (req, res) {
    // response.sendFile(__dirname + '/views/index.html');
    wikiPageAPI.createGetName()
      .then(name => {
        res.send(name)
      });
  });

  // listen for requests :)
  var server = app.listen(process.env.PORT || 3000);
  return server;
}
