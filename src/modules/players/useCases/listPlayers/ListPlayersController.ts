import { Request, Response } from 'express';
import { ListPlayersUseCase } from './ListPlayersUseCase';

export class ListPlayersController {
  async handle(request: Request, response: Response) {
    const listPlayersUseCase = new ListPlayersUseCase();
    const result = await listPlayersUseCase.execute();

    return response.json(result);
  }
}
