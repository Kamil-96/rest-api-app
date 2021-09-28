const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '614d6c465425e2317f65a7f1', performer: 'John Smith', genre: 'Metal', price: 25, day: 1, image: 'Lorem Ipsum' });
    await testConcertOne.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/concerts/614d6c465425e2317f65a7f1');
    const deletedDocument = await Concert.findOne({ _id: '614d6c465425e2317f65a7f1' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedDocument).to.be.null;
  });
});