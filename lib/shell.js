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
  let NamesAPI = createNames(services)();

  var app = express();
  app.use(express.static('front_end/public'));

  app.get('/name', function (req, res) {
    NamesAPI.getName()
      .then(name => {
        res.send(name.name);
      });
  });
  app.get('/all', function (req, res) {
    NamesAPI.getName()
      .then(x => {
        res.send(x);
      });
  });
  app.get('/kebab', function (req, res) {
    NamesAPI.getName()
      .then(name => {
        res.send(name.kebabCase);
      });
  });

  var server = app.listen(process.env.PORT || 3000);
  return server;
};
