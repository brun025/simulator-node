import { Request, Response } from 'express';
import { ListPropertiesUseCase } from './ListPropertiesUseCase';

export class ListPropertiesController {
  async handle(request: Request, response: Response) {
    const listPropertiesUseCase = new ListPropertiesUseCase();
    const result = await listPropertiesUseCase.execute();

    return response.json(result);
  }
}
