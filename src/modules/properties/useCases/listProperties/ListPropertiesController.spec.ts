import app  from "../../../../app";
import request from "supertest";
import { prisma } from "../../../../database/prismaClient";

describe('List Properties Controller', () => {

  const BASE_URL = '/jogo/property';

  afterAll(async () => {
    await prisma.property.deleteMany()
  });

  it('should be able to list all propertyes ', async() => {
    const property = {
      rent_value: 50,
      price: 100,
    }

    await request(app).post(BASE_URL).send(property);

    const response = await request(app).get(BASE_URL);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});