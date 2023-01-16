import { Player } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { PlayerType } from '../../../players/enum/PlayerType';

let players: Player[];
let propertyUpdate: any;
let playerUpdate: any;
let result: any
let removePlayer: string[] = [];
let roll_the_dice = 0;
let conditional: boolean;
let reason_not_buy: string;
let current_player: any;
let shuffled: any;
const MAX_RENT_VALUE_DEMANDING = 50;
const MAX_BALANCE_RESERVE_CAUTIOUS = 80;
const PROBABILITY_BUY_PROPERTY = 1;

export class CreateSimulatorUseCase {
  async execute() {
    const TOTAL_ROUNDS = 1000;
    const MAX_PROPERTY = 20;
    const FULL_LAP_BONUS = 100;
    let indice = 0;
    let currentProperty: any;
    let currentPropertyNewRound: any;

    removePlayer = [];
    
    //update all balance players for begin simulation
    await prisma.player.updateMany({
      data: { balance: 300 },
    });

    players = await prisma.player.findMany();

    shuffled = players
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    while (indice < TOTAL_ROUNDS) {
      if (players.length <= 1) {
        break;
      }
      console.log('\n Rodada', indice + 1)

      if (indice >= players.length) {
        if (shuffled.length === 0) {
          shuffled = players
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        }

        await this.currentPlayer();

        currentProperty = await prisma.property.findFirst({
          where: { id_player: current_player.id }
        });

        if (currentProperty) {
          roll_the_dice += currentProperty.order;

          if (roll_the_dice > MAX_PROPERTY){
            roll_the_dice -= MAX_PROPERTY;
            current_player.balance = parseFloat(current_player.balance) + FULL_LAP_BONUS;
          }
        }

        currentPropertyNewRound = await prisma.property.findFirst({
          where: { order: roll_the_dice },
          include: {
            player: true
          },
        });
        
        await this.playerType(current_player, currentPropertyNewRound);
      } else {
        await this.currentPlayer();
  
        currentProperty = await prisma.property.findFirst({
          where: { order: roll_the_dice },
          include: {
            player: true
          },
        });

        await this.playerType(current_player, currentProperty);
      }
      
      if (this.isPlayerBalanceNegative(playerUpdate)) {
        removePlayer.push(playerUpdate.id);
        await prisma.property.updateMany({
          where: { id_player: playerUpdate.id },
          data: {
            id_player: null,
            status: null
          },
        });
      }
  
      players = await prisma.player.findMany({
        where: {
          id: { notIn: removePlayer },
        }
      });
  
      players.forEach(player => console.log(player.type, ' - ', player.balance));

      indice++;
    }

    result = await prisma.player.findMany({
      orderBy: {
          balance: 'desc',
      },
      select: {
        type: true,
      },
    });

    let winner = result.slice();
    winner = winner.shift();
    result = result.map((a: { type: string; }) => a.type)

    players = await prisma.player.findMany();
    console.log('\n\n PONTUAÇÃO FINAL:')
    players.forEach(player => console.log(player.type, ' Saldo: ', player.balance));

    return {
      'vencedor': winner.type,
      'jogadores': result
    };
  }

  private isPlayerBalanceNegative(playerUpdate: any): boolean {
    return (playerUpdate && parseFloat(playerUpdate.balance) < 0 && !removePlayer.includes(playerUpdate.id));
  }

  private async currentPlayer() {
    current_player = shuffled.shift();
    current_player = await prisma.player.findFirst({
      where: { id: current_player.id }
    });

    roll_the_dice = Math.floor(Math.random() * 6) + 1;
  }

  private async playerMove(conditional: boolean, current_player: any, currentPropertyNewRound: any) {
    if (currentPropertyNewRound?.id_player && currentPropertyNewRound?.id_player !== current_player.id) {
      playerUpdate = await prisma.player.update({
        where: { id: current_player.id },
        data: { balance: parseFloat(current_player.balance) -  parseFloat(currentPropertyNewRound.rent_value)},
      });

      if (!removePlayer.includes(currentPropertyNewRound.id_player)) {
        await prisma.player.update({
          where: { id: currentPropertyNewRound?.id_player },
          data: { balance: parseFloat(currentPropertyNewRound.player.balance) +  parseFloat(currentPropertyNewRound.rent_value)},
        });
      }

      console.log('player ', current_player.type, " pagou ", currentPropertyNewRound.rent_value, " de aluguel na propriedade ", currentPropertyNewRound.order, " para o ", currentPropertyNewRound.player.type)
    } else {
      if (conditional) {
        if (parseFloat(current_player.balance) >= currentPropertyNewRound.price) {
          propertyUpdate = await prisma.property.update({
            where: { id: currentPropertyNewRound?.id },
            data: {
              id_player: current_player?.id,
              status: 'Comprada'
            },
          });
  
          playerUpdate = await prisma.player.update({
            where: { id: current_player.id },
            data: { balance: parseFloat(current_player.balance) -  parseFloat(currentPropertyNewRound.price)},
          });
  
          console.log('player ', current_player.type, " pagou ", currentPropertyNewRound.price, " na compra da propriedade ", currentPropertyNewRound.order)
        } else {
          console.log('player ', current_player.type, " com saldo insuficiente para a compra da propriedade ", currentPropertyNewRound.order)
        }
      } else {
        console.log(reason_not_buy);
      }
    }
  }

  private async playerType(current_player: any, currentPropertyNewRound: any) {
    switch (current_player.type) {
      case PlayerType.IMPULSIVO:
        reason_not_buy = '';
        await this.playerMove(true, current_player, currentPropertyNewRound);
        break;
      case PlayerType.EXIGENTE:
        conditional = (currentPropertyNewRound.rent_value > MAX_RENT_VALUE_DEMANDING);
        reason_not_buy = 'player ', current_player.type, " não compra propriedade ", currentPropertyNewRound.order ," com aluguel acima de 50";
        await this.playerMove(conditional, current_player, currentPropertyNewRound);
        break;
      case PlayerType.CAUTELOSO:
        conditional = (current_player.balance - currentPropertyNewRound.price === MAX_BALANCE_RESERVE_CAUTIOUS);
        reason_not_buy = 'player ', current_player.type, " não compra propriedade ", currentPropertyNewRound.order ,
        " quando a reserva de saldo após a compra for menor que ", MAX_BALANCE_RESERVE_CAUTIOUS;
        await this.playerMove(conditional, current_player, currentPropertyNewRound);
        break;
      case PlayerType.ALEATORIO:
        roll_the_dice = Math.floor(Math.random() * 2) + 1;
        conditional = (roll_the_dice === PROBABILITY_BUY_PROPERTY);
        reason_not_buy = 'player ', current_player.type, " caiu na probalidade de 50% de não comprar a propriedade ", currentPropertyNewRound.order;
        await this.playerMove(conditional, current_player, currentPropertyNewRound);
        break;
      default:
        break;
    }
  }
}
