import { prisma as prismaClient } from '../../../../database/prismaClient';

interface IUpdateProperty {
  id:        string;
  id_player: string;
  status:    string;
}

export class UpdatePropertyUseCase {
  async execute({ id, id_player, status }: IUpdateProperty) {
    let property = await prismaClient.property.findFirst({
      where: { id: id },
    });

    if(!property) {
      throw new Error(`Property ${id} is not exists.`);
    }
    
    property = await prismaClient.property.update({
      where: { id: id },
      data: {
        id_player,
        status
      },
    });

    return property;
  }
}
