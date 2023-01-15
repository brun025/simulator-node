import { Router } from 'express';
import { CreateSimulatorController } from './modules/game/useCases/simulator/CreateSimulatorController';
import { CreatePlayerController } from './modules/players/useCases/createPlayer/CreatePlayerController';
import { ListPlayersController } from './modules/players/useCases/listPlayers/ListPlayersController';
import { UpdateBalancePlayerController } from './modules/players/useCases/updatePlayer/UpdateBalancePlayerController';
import { CreatePropertyController } from './modules/properties/useCases/createProperty/CreatePropertyController';
import { ListPropertiesController } from './modules/properties/useCases/listProperties/ListPropertiesController';
import { UpdatePropertyController } from './modules/properties/useCases/updateProperty/UpdatePropertyController';

const routes = Router();

const createSimulatorController = new CreateSimulatorController();

const createPlayerController = new CreatePlayerController();
const listPlayerController = new ListPlayersController();
const updateBalancePlayerController = new UpdateBalancePlayerController();

const createPropertyController = new CreatePropertyController();
const listPropertiesController = new ListPropertiesController();
const updatePropertyController = new UpdatePropertyController();

routes.post('/jogo/simular', createSimulatorController.handle);

routes.post('/jogo/player', createPlayerController.handle);
routes.get('/jogo/player', listPlayerController.handle);
routes.put('/jogo/player/:id/balance', updateBalancePlayerController.handle);

routes.post('/jogo/property', createPropertyController.handle);
routes.get('/jogo/property', listPropertiesController.handle);
routes.put('/jogo/property/:id', updatePropertyController.handle);

export { routes };