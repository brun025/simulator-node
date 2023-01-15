import { Request, Response } from 'express';
import { CreatePropertyUseCase } from './CreatePropertyUseCase';

export class CreatePropertyController {
  async handle(request: Request, response: Response) {
    const { rent_value, price } = request.body;

    const createPropertyUseCase = new CreatePropertyUseCase();
    const result = await createPropertyUseCase.execute({
      rent_value,
      price 
    });

    return response.status(201).json(result);
  }
}
