import app  from "../../../../app";
import request from "supertest";
import { prisma } from "../../../../database/prismaClient";
import { PlayerType } from "../../../players/enum/PlayerType";

describe('Update Property Controller', () => {

  const BASE_URL = '/jogo/property';

  afterAll(async () => {
    await prisma.property.deleteMany()
    await prisma.player.deleteMany()
  });

  it('should be able to update a property ', async() => {
    const player = {
      username: 'Jogador 10',
      type: PlayerType.IMPULSIVO
    }

    const newPlayer = await request(app).post('/jogo/player').send(player);

    const property = {
      rent_value: 50,
      price: 100,
    }

    let resultProperty: any = await request(app).post(`${BASE_URL}`).send(property);
    const response = await request(app).put(`${BASE_URL}/${resultProperty.body.id}`)
    .send({ 
      id_player: newPlayer.body.id,
      status: 'Comprada'
    } );

    expect(response.status).toBe(201);
    expect(parseFloat(response.body.rent_value)).toEqual(property.rent_value);
    expect(parseFloat(response.body.price)).toEqual(property.price);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('order');
    expect(response.body).toHaveProperty('id_player');
    expect(response.body).toHaveProperty('created_at');
  });

  it('should not be able to update a property when it is not exists', async() => {
    const response = await request(app).put(`${BASE_URL}/fake_id`)
    .send({ 
      id_player: 'fake_id',
      status: 'Comprada'
    });
    expect(response.status).toBe(400);
  });

});