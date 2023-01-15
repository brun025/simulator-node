import app  from "../../../../app";
import request from "supertest";
import { prisma } from "../../../../database/prismaClient";
import { PlayerType } from "../../enum/PlayerType";

describe('ListPlayersController', () => {

  const BASE_URL = '/jogo/player';

  afterAll(async () => {
    await prisma.player.deleteMany()
  });

  it('should be able to list all players ', async() => {
    const player = {
      username: 'Jogador 10',
      type: PlayerType.IMPULSIVO
    }

    await request(app).post(BASE_URL).send(player);

    const response = await request(app).get(BASE_URL);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject(player);
  });
});