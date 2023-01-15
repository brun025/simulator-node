import app  from "../../../../app";
import request from "supertest";
import { prisma } from "../../../../database/prismaClient";

describe('Create Property Controller', () => {

  const BASE_URL = '/jogo/property';

  afterAll(async () => {
    await prisma.property.deleteMany()
  });

  it('should be able to create a property ', async() => {
    const property = {
      rent_value: 50,
      price: 100,
    }

    const response = await request(app).post(BASE_URL).send(property);

    expect(response.status).toBe(201);
    expect(parseFloat(response.body.price)).toEqual(property.price);
    expect(parseFloat(response.body.rent_value)).toEqual(property.rent_value);
    expect(response.body).toHaveProperty('order');
    expect(response.body).toHaveProperty('created_at');
  });
});