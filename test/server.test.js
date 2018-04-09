import chai from 'chai';
const expect = chai.expect;

import supertest from 'supertest';
import createServer from '../lib/shell';


describe('Server Module', function () {
  this.timeout(5000);  // extend timeout to allow for network latency
  let server;
  beforeEach(function () {
    server = createServer();
  });
  afterEach(function () {
    server.close();
  });
  it('root returns 200', () => {
    return supertest(server)
      .get('/')
      .expect(200);
  });
  it('name returns a name', () => {
    return supertest(server)
      .get('/name')
      .expect(200)
      .then(res => {
        let name = res.text;
        expect(name).to.be.a('string');
        expect(name.length > 2).to.equal(true);
      });
  });
});

