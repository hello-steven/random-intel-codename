var express = require('express');
import jsdom from 'jsdom';
import axios from 'axios';
import createNames from './names';
import R from 'ramda';

export default () => {
  const services = {
    axios: axios,
    jsdom: jsdom.JSDOM,
    R:R
  };

  var app = express();
  app.use(express.static('front_end/public'));

  // createName returns a promise because it has an async setup
  return createNames(services)()
    .then(NamesAPI => {
      app.get('/name', function (req, res) {
        let name =   NamesAPI.getName();
        res.send(name.name);
      });
      app.get('/all', function (req, res) {
        res.send(NamesAPI.getName());
      });
      app.get('/kebab', function (req, res) {
        let name =   NamesAPI.getName();
        res.send(name.kebabCase);
      });
      var server = app.listen(process.env.PORT || 3000);
      return server;
    });
};
