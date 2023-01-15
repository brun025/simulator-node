import { prisma } from '../../../../database/prismaClient';

export class ListPlayersUseCase {
  async execute() {
    const players = await prisma.player.findMany()

    return players;
  }
}
