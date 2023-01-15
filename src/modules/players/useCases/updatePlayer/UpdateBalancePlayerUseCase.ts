import { prisma } from '../../../../database/prismaClient';

interface IUpdateBalancePlayer {
  id: string;
  balance: string;
}

export class UpdateBalancePlayerUseCase {
  async execute({ id, balance }: IUpdateBalancePlayer) {
    let player = await prisma.player.findFirst({
      where: {
        id: id
      },
    });

    if (!player) {
      throw new Error(`Player ${id} not found.`);
    }

    player = await prisma.player.update({
      where: {
        id: id
      },
      data: {
        balance,
      },
    });

    return player;
  }
}
