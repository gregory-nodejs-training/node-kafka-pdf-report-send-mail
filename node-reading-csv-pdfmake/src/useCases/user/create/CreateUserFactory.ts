import { UserRepository } from '../UserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUserService';

export const createUserFactory = () => {
  const userRepository = new UserRepository();
  const createUserService = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUserService);
  return createUserController;
};
