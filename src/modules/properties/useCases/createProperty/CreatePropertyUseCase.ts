import { Prisma } from '@prisma/client';
import { prisma as prismaClient } from '../../../../database/prismaClient';

interface ICreateProperty {
  rent_value: Prisma.Decimal;
  price:     number;
}

export class CreatePropertyUseCase {
  async execute({ rent_value, price }: ICreateProperty) {
    const property = await prismaClient.property.create({
      data: {
        rent_value: new Prisma.Decimal(rent_value),
        price: new Prisma.Decimal(price),
      },
    });

    return property;
  }
}
