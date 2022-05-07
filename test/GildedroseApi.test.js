const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const jsonSchema = require('chai-json-schema');
const { itemSchema } = require('../schema/Item.schema');
const { itemListSchema } = require('../schema/ItemList.schema');

const { expect } = chai;
chai.use(jsonSchema);

const apiURL = 'http://localhost:8080/api';

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

describe('Test Gildedrose API endpoints', () => {
  let itemId;
  before(async () => {
    const query = {
      name: 'Miel mostaza',
      sellIn: random(1, 50),
      quality: 20,
      type: 'AGED'
    };
    const res = await agent.get(`${apiURL}/items`);
    if (res.body.length > 0) {
      res.body.forEach(async (item) => { await agent.delete(`${apiURL}/items/${item.id}`); });
    }
    const response = await agent.post(`${apiURL}/items`).send(query);
    itemId = response.body.id;
  });

  it('Consume GET service with get item endpoint', async () => {
    const response = await agent.get(`${apiURL}/items/${itemId}`);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.be.jsonSchema(itemSchema);
    expect(response.body.id).to.equal(itemId);
  });

  it('Consume GET service should throw a Not found error', async () => {
    const response = await agent.get(`${apiURL}/items/210`).ok(() => true);

    expect(response.status).to.equal(statusCode.NOT_FOUND);
  });

  it('Consume GET service with list items endpoint', async () => {
    const response = await agent.get(`${apiURL}/items`);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.be.jsonSchema(itemListSchema);
  });

  it('Consume POST service with create item endpoint', async () => {
    const query = {
      name: 'Miel de abeja',
      sellIn: random(1, 50),
      quality: 20,
      type: 'AGED'
    };

    const response = await agent.post(`${apiURL}/items`).send(query);
    const validationResponse = await agent.get(`${apiURL}/items`);

    expect(response.status).to.equal(statusCode.CREATED);
    expect(response.body.name).to.equal('Miel de abeja');
    expect(response.body.quality).to.equal(20);
    expect(response.body.type).to.equal('AGED');
    expect(validationResponse.body.length).to.equal(2);
    expect(response.body).to.be.jsonSchema(itemSchema);
  });

  it('Consume POST service with update quality endpoint', async () => {
    const response = await agent.get(`${apiURL}/items`);
    const itemQuality = response.body[0].quality;

    const res = await agent.post(`${apiURL}/items/quality`);

    expect(res.status).to.equal(statusCode.OK);
    expect(res.body).to.be.jsonSchema(itemListSchema);
    expect(res.body[0].quality - itemQuality).to.equal(1);
  });

  it('Consume PUT service with update item endpoint', async () => {
    const item = {
      name: 'Miel',
      sellIn: random(1, 50),
      quality: 20,
      type: 'NORMAL'
    };

    const response = await agent.put(`${apiURL}/items/${itemId}`).send(item);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).to.be.equal(item.name);
    expect(response.body.sellIn).to.be.equal(item.sellIn);
    expect(response.body.quality).to.be.equal(item.quality);
    expect(response.body.type).to.be.equal(item.type);
    expect(response.body).to.be.jsonSchema(itemSchema);
  });

  it('Consume DELETE service with delete item endpoint', async () => {
    const response = await agent.delete(`${apiURL}/items/${itemId}`);
    const validationResponse = await agent.get(`${apiURL}/items`);

    expect(response.status).to.equal(statusCode.OK);
    expect(validationResponse.body.length).to.equal(1);
  });
  
  after(()=>{
    const res = await agent.get(`${apiURL}/items`);
    if (res.body.length > 0) {
      res.body.forEach(async (item) => { await agent.delete(`${apiURL}/items/${item.id}`); });
    }
  })
  
});
