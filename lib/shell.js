var express = require('express');
import jsdom from 'jsdom';
import axios from 'axios';
import Foswig from 'foswig';
import createNames from './names';
import R from 'ramda';

export default () => {
  const services = {
    axios: axios,
    jsdom: jsdom.JSDOM,
    R:R,
    Foswig: Foswig
  };

  var app = express();
  app.use(express.static('front_end/public'));

  // createName returns a promise because it has an async setup
  return createNames(services)()
    .then(NamesAPI => {
      app.get('/name', function (req, res) {
        let name = NamesAPI.getName();
        res.send(name);
      });
      app.get('/all', function (req, res) {
        res.send({
          name: NamesAPI.getName(),
          kebab: NamesAPI.getKebabCaseName(),
          shuffle: NamesAPI.getShuffledName()
        });
      });
      app.get('/kebab', function (req, res) {
        let name = NamesAPI.getKebabCaseName();
        res.send(name);
      });
      app.get('/shuffled', (req, res) => {
        let name =   NamesAPI.getShuffledName();
        res.send(name);
      });
      var server = app.listen(process.env.PORT || 3000);
      return server;
    });
};
