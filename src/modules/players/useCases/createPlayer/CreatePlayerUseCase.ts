import { Type } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

interface ICreatePlayer {
  username: string;
  type:     Type;
}

export class CreatePlayerUseCase {
  async execute({ username, type }: ICreatePlayer) {
    const player = await prisma.player.create({
      data: {
        username,
        type
      },
    });

    return player;
  }
}
