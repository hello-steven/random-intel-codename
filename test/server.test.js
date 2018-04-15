import chai from 'chai';
const expect = chai.expect;

import supertest from 'supertest';
import createServer from '../lib/shell';
import axios from 'axios';

describe('Server Module', function () {
  this.timeout(5000);  // extend timeout to allow for network latency
  it('root returns 200', () => {
    return axios.get('http://localhost:3000')
      .then(res => {
        expect(res.status).to.equal(200);
      });
  });
  it('/name returns a name', () => {
    return axios.get('http://localhost:3000/name')
      .then(res => {
        expect(res.status).to.equal(200);
        let name = res.data;
        expect(name).to.be.a('string');
        expect(/{/g.test(name)).to.equal(false);
        expect(name.length > 2).to.equal(true);
      })
  });
  it('/kebab return a kebab', () => {
    return axios.get('http://localhost:3000/kebab')
      .then(res => {
        expect(res.status).to.equal(200);
        let name = res.data;
        expect(name).to.be.a('string');
        expect(/{/g.test(name)).to.equal(false); // make sure it just a name and not js object
        expect(name.length > 2).to.equal(true);
      });
  });
  it('/shuffle return a kebab', () => {
    return axios.get('http://localhost:3000/shuffled')
      .then(res => {
        expect(res.status).to.equal(200);
        let name = res.data;
        expect(name).to.be.a('string');
        expect(/{/g.test(name)).to.equal(false); // make sure it just a name and not js object
        expect(name.length > 2).to.equal(true);
      })
  });
  it('/all returns json', () => {
    return axios.get('http://localhost:3000/all')
      .then(res => {
        expect(res.status).to.equal(200);
        let x = res.data;
        expect(x).to.be.an('object');
        expect(x).to.have.property('name');
        expect(x).to.have.property('kebab');
        expect(x).to.have.property('shuffle');
      });
  });
});

