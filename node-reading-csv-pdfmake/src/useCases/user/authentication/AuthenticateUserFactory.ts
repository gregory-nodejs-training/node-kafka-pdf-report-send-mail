import { UserRepository } from '../UserRepository';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserService } from './AuthenticateUserService';

export const authenticateUserFactory = () => {
  const userRepository = new UserRepository();
  const authenticateUserService = new AuthenticateUserService(userRepository);
  const authenticateUserController = new AuthenticateUserController(authenticateUserService);
  return authenticateUserController;
};
