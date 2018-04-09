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
  let realNamesAPI = createNames(realServices)();
  it('kebabCase swaps space for dash', () => {
    let name = realNamesAPI.toKebabCase('TEST test');
    expect(name).to.be.an('string');
    expect(/-/g.test(name)).to.equal(true);
  });
  it('kebabCase trims start and end spaces', () => {
    let name = realNamesAPI.toKebabCase('  TEST test  ');
    expect(name).to.be.an('string');
    expect(name[0] !== '-').to.equal(true);
    expect(name[name.length] !== '-').to.equal(true);
  });
  it('createGetName returns a function', () => {
    expect(realNamesAPI.getName).to.be.an('function');
  });
  it('getName returnes a names', () => {
    return realNamesAPI.getName()
      .then(x => {
        expect(x).to.be.an('object');
        expect(x).to.have.property('name');
        expect(x).to.have.property('kebabCase');
      });
  });
});

