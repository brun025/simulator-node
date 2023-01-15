import { Request, Response } from 'express';
import { CreatePlayerUseCase } from './CreatePlayerUseCase';

export class CreatePlayerController {
  async handle(request: Request, response: Response) {
    const { username, type } = request.body;

    const createPlayerUseCase = new CreatePlayerUseCase();
    const result = await createPlayerUseCase.execute({
      username,
      type
    });

    return response.status(201).json(result);
  }
}
