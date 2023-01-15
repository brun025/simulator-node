import { Request, Response } from 'express';
import { CreateSimulatorUseCase } from './CreateSimulatorUseCase';

export class CreateSimulatorController {
  async handle(request: Request, response: Response) {

    const createSimulatorUseCase = new CreateSimulatorUseCase();
    const result = await createSimulatorUseCase.execute();

    return response.status(201).json(result);
  }
}
