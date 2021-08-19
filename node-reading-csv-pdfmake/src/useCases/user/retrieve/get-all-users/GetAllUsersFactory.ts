import { UserRepository } from '../../UserRepository';
import { GetAllUsersController } from './GetAllUsersController';
import { GetAllUsersService } from './GetAllUsersService';

export const getAllUsersFactory = () => {
  const userRepository = new UserRepository();
  const getAllUsersService = new GetAllUsersService(userRepository);
  const getAllUsersController = new GetAllUsersController(getAllUsersService);
  return getAllUsersController;
};
