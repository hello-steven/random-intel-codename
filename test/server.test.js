import chai from 'chai';
const expect = chai.expect;

import supertest from 'supertest';
import createServer from '../lib/shell';


describe('Server Module', function () {
  this.timeout(5000);  // extend timeout to allow for network latency
  let serverPromise;
  beforeEach(function () {
    serverPromise = createServer();
  });
  it('root returns 200', () => {
    return serverPromise.then(server => {
      return supertest(server)
        .get('/')
        .expect(200)
        .then(test => {
          server.close();
          return test;
        });
    });
  });
  it('/name returns a name', () => {
    return serverPromise.then(server => {
      return supertest(server)
        .get('/name')
        .expect(200)
        .then(res => {
          let name = res.text;
          expect(name).to.be.a('string');
          expect(/{/g.test(name)).to.equal(false);
          expect(name.length > 2).to.equal(true);
        })
        .then(test => {
          server.close();
          return test;
        });
    });
  });

  it('/kebab return a kebab', () => {
    return serverPromise.then(server => {
      return supertest(server)
        .get('/kebab')
        .expect(200)
        .then(res => {
          let name = res.text;
          expect(name).to.be.a('string');
          expect(/{/g.test(name)).to.equal(false); // make sure it just a name and not js object
          expect(name.length > 2).to.equal(true);
        })
        .then(test => {
          server.close();
          return test;
        });
    });
  });
  it('/all returns json', () => {
    return serverPromise.then(server => {
      return supertest(server)
        .get('/all')
        .expect(200)
        .then(res => {
          let x = JSON.parse(res.text);
          expect(x).to.be.an('object');
          expect(x).to.have.property('name');
          expect(x).to.have.property('kebabCase');
        })
        .then(test => {
          server.close();
          return test;
        });
    });
  });
});

