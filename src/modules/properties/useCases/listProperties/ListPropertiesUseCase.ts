import { prisma } from '../../../../database/prismaClient';

export class ListPropertiesUseCase {
  async execute() {
    const properties = await prisma.property.findMany()

    return properties;
  }
}
