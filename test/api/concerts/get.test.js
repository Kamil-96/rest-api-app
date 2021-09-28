const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '614d6c465425e2317f65a7f1', performer: 'John Smith', genre: 'Metal', price: 25, day: 1, image: 'Lorem Ipsum' });
    await testConcertOne.save();

    const testConcertTwo = new Concert({ _id: '614d6c465425e2317f65a7f2', performer: 'Kate Wilson', genre: 'Pop', price: 40, day: 2, image: 'abc' });
    await testConcertTwo.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id', async () => {
    const res = await request(server).get('/api/concerts/614d6c465425e2317f65a7f2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
});