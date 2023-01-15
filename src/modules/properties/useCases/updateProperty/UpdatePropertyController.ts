import { Request, Response } from 'express';
import { UpdatePropertyUseCase } from './UpdatePropertyUseCase';

export class UpdatePropertyController {
  async handle(request: Request, response: Response) {
    const { id_player, status } = request.body;
    const { id } = request.params;

    const updatePropertyUseCase = new UpdatePropertyUseCase();
    const result = await updatePropertyUseCase.execute({
      id, 
      id_player, 
      status
    });

    return response.status(201).json(result);
  }
}
