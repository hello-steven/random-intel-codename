// testing deps
import chai from 'chai';
const expect = chai.expect;
// file deps
import createNames from '../lib/names';
// service deps
import jsdom from 'jsdom';
import axios from 'axios';
import R from 'ramda';

const realServices = {
  axios: axios,
  jsdom: jsdom.JSDOM,
  R:R
};
describe('Names Module', function () {
  //let realNamesAPI = createNames(realServices)();
  var realNamesAPI;
  beforeEach(function() {
    realNamesAPI = createNames(realServices)();
  });
  it('kebabCase swaps space for dash', () => {
    return realNamesAPI.then(function (api) {
      let name = api.toKebabCase('TEST test');
      expect(name).to.be.an('string');
      expect(/-/g.test(name)).to.equal(true);
    });
  });
  it('kebabCase trims start and end spaces', () => {
    return realNamesAPI.then(function (api) {
      let name = api.toKebabCase('  TEST test  ');
      expect(name).to.be.an('string');
      expect(name[0] !== '-').to.equal(true);
      expect(name[name.length] !== '-').to.equal(true);
    });
  });
  it('createGetName returns a promise', () => {
    expect(realNamesAPI).to.be.an('promise');
  });
  it('getName returnes a names', () => {
    return realNamesAPI.then(function (api) {
      let names = api.getName();
      expect(names).to.be.an('object');
      expect(names).to.have.property('name');
      expect(names).to.have.property('kebabCase');
    });
  });
});

