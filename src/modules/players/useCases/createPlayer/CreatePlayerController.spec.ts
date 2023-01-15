import app  from "../../../../app";
import request from "supertest";
import { prisma } from "../../../../database/prismaClient";
import { PlayerType } from "../../enum/PlayerType";

describe('Create Player Controller', () => {

  const BASE_URL = '/jogo/player';

  afterAll(async () => {
    await prisma.player.deleteMany()
  });

  it('should be able to create a player ', async() => {
    const player = {
      username: 'Jogador 10',
      type: PlayerType.IMPULSIVO
    }

    const response = await request(app).post(BASE_URL).send(player);

    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(player.username);
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('created_at');
  });

  it('should not be able to create a player with username exists', async() => {
    await request(app).post(BASE_URL).send({
      username: 'Jogador 11',
      type: PlayerType.CAUTELOSO
    });

    const response = await request(app).post(BASE_URL).send({
      username: 'Jogador 11',
      type: PlayerType.EXIGENTE
    });

    expect(response.status).toBe(400);
  });

});