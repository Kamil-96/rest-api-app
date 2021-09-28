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

    const testConcertTwo = new Concert({ _id: '614d6c465425e2317f65a7f2', performer: 'Kate Wilson', genre: 'Pop', price: 40, day: 2, image: 'Dolor sit amet' });
    await testConcertTwo.save();

    const testConcertThree = new Concert({ _id: '614d6c465425e2317f65a7f3', performer: 'John Smith', genre: 'Rock', price: 15, day: 3, image: 'Lorem lorem' });
    await testConcertThree.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('/:id should return one concert by :id', async () => {
    const res = await request(server).get('/api/concerts/614d6c465425e2317f65a7f2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return all concerts of chosen artist', async () => {
    const res = await request(server).get('/api/concerts/performer/John Smith');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/genre/:genre should return all concerts of chosen genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/price/:price_min/:price_max should return concerts with price between ":price_min" and ":price_max"', async () => {
    const res = await request(server).get('/api/concerts/price/25/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/price/day/:day should return all concerts of chosen day', async () => {
    const res = await request(server).get('/api/concerts/price/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
});