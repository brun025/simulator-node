import { Request, Response } from 'express';
import { UpdateBalancePlayerUseCase } from './UpdateBalancePlayerUseCase';

export class UpdateBalancePlayerController {
  async handle(request: Request, response: Response) {
    const { balance } = request.body;
    const { id } = request.params;

    const updateBalancePlayerUseCase = new UpdateBalancePlayerUseCase();
    const result = await updateBalancePlayerUseCase.execute({
      id,
      balance
    });

    return response.status(201).json(result);
  }
}
