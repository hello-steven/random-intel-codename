// testing deps
import chai from 'chai';
const expect = chai.expect;
// file deps
import createNames from '../lib/names';
// service deps
import jsdom from 'jsdom';
import axios from 'axios';
import R from 'ramda';
import Foswig from 'foswig';

const realServices = {
  axios: axios,
  jsdom: jsdom.JSDOM,
  R:R,
  Foswig: Foswig
};
describe('Names Module', function () {
  //let realNamesAPI = createNames(realServices)();
  var realNamesAPI;
  beforeEach(function() {
    realNamesAPI = createNames(realServices)();
  });
  it('createGetName returns a promise', () => {
    expect(realNamesAPI).to.be.an('promise');
  });
  it('getName returnes a name', () => {
    return realNamesAPI.then(function (api) {
      let names = api.getName();
      expect(names).to.be.an('string');
    });
  });
  it('getKebabCase returnes a name', () => {
    return realNamesAPI.then(function (api) {
      let names = api.getKebabCaseName();
      expect(names).to.be.an('string');
    });
  });
  it('getShuffledName returnes a name', () => {
    return realNamesAPI.then(function (api) {
      let names = api.getShuffledName();
      expect(names).to.be.an('string');
    });
  });
});

