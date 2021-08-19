import { UserRepository } from '../../UserRepository';

class GetAllUsersService {
  constructor(private userRepository: UserRepository) {}
  async execute() {
    const users = await this.userRepository.listAll();
    return users;
  }
}

export { GetAllUsersService };
