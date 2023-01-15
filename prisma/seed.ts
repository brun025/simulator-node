import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client';
import { PlayerType } from '../src/modules/players/enum/PlayerType';

const prisma = new PrismaClient()
async function main() {
    const players = await prisma.player.findMany();

    if (players.length === 0) {
        console.log("\n###INSERINDO JOGADORES...###");
    
        const player1 = await prisma.player.createMany({
            data: [
                {
                    username: 'jogador 1',
                    type: PlayerType.IMPULSIVO
                },
                {
                    username: 'jogador 2',
                    type: PlayerType.EXIGENTE
                },
                {
                    username: 'jogador 3',
                    type: PlayerType.CAUTELOSO
                },
                {
                    username: 'jogador 4',
                    type: PlayerType.ALEATORIO
                },
            ],
        });
    }

    const properties = await prisma.property.findMany();

    if (properties.length === 0) {
        console.log("\n###INSERINDO PROPRIEDADES...###");
    
        const property = await prisma.property.createMany({
            data: [
                {
                    rent_value: new Prisma.Decimal(10),
                    price: new Prisma.Decimal(20),
                },
                {
                    rent_value: new Prisma.Decimal(20),
                    price: new Prisma.Decimal(40),
                },
                {
                    rent_value: new Prisma.Decimal(30),
                    price: new Prisma.Decimal(60),
                },
                {
                    rent_value: new Prisma.Decimal(40),
                    price: new Prisma.Decimal(80),
                },
                {
                    rent_value: new Prisma.Decimal(50),
                    price: new Prisma.Decimal(100),
                },
                {
                    rent_value: new Prisma.Decimal(60),
                    price: new Prisma.Decimal(120),
                },
                {
                    rent_value: new Prisma.Decimal(70),
                    price: new Prisma.Decimal(140),
                },
                {
                    rent_value: new Prisma.Decimal(80),
                    price: new Prisma.Decimal(160),
                },
                {
                    rent_value: new Prisma.Decimal(90),
                    price: new Prisma.Decimal(180),
                },
                {
                    rent_value: new Prisma.Decimal(100),
                    price: new Prisma.Decimal(200),
                },
                {
                    rent_value: new Prisma.Decimal(110),
                    price: new Prisma.Decimal(220),
                },
                {
                    rent_value: new Prisma.Decimal(120),
                    price: new Prisma.Decimal(240),
                },
                {
                    rent_value: new Prisma.Decimal(130),
                    price: new Prisma.Decimal(260),
                },
                {
                    rent_value: new Prisma.Decimal(140),
                    price: new Prisma.Decimal(280),
                },
                {
                    rent_value: new Prisma.Decimal(150),
                    price: new Prisma.Decimal(300),
                },
                {
                    rent_value: new Prisma.Decimal(160),
                    price: new Prisma.Decimal(300),
                },
                {
                    rent_value: new Prisma.Decimal(170),
                    price: new Prisma.Decimal(300),
                },
                {
                    rent_value: new Prisma.Decimal(180),
                    price: new Prisma.Decimal(300),
                },
                {
                    rent_value: new Prisma.Decimal(190),
                    price: new Prisma.Decimal(300),
                },
                {
                    rent_value: new Prisma.Decimal(200),
                    price: new Prisma.Decimal(300),
                }
            ],
        });
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});