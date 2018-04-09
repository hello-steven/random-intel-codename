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
  app.use(express.static('public'));

  app.get('/name', function (req, res) {
    NamesAPI.getName()
      .then(name => {
        res.send(name);
      });
  });

  var server = app.listen(process.env.PORT || 3000);
  return server;
};
