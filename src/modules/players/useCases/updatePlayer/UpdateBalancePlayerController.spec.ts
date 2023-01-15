import app  from "../../../../app";
import request from "supertest";
import { prisma } from "../../../../database/prismaClient";
import { PlayerType } from "../../enum/PlayerType";

describe('Update Balance Player Controller', () => {

  const BASE_URL = '/jogo/player';

  afterAll(async () => {
    await prisma.player.deleteMany()
  });

  it('should be able to update a player ', async() => {
    let player = {
      username: 'Jogador 10',
      type: PlayerType.IMPULSIVO
    }

    let resultPlayer: any = await request(app).post(`${BASE_URL}`).send(player);
    const response = await request(app).put(`${BASE_URL}/${resultPlayer.body.id}/balance`).send({ balance: 400 } );

    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(player.username);
    expect(parseFloat(response.body.balance)).toEqual(400);
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('created_at');
  });

  it('should not be able to update a player when is not exists', async() => {
    const response = await request(app).put(`${BASE_URL}/fake_id/balance`).send({ balance: 400 } );
    expect(response.status).toBe(400);
  });

});