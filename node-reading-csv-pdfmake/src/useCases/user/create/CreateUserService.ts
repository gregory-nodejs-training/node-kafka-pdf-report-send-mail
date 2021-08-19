import { HTTP400Error } from '@exceptions/HTTP400Error';
import { User } from '@prisma/client';
import { Validators } from '@utils/Validators';
import { hash } from 'bcryptjs';
import { UserDTO } from '../models/UserDTO';
import { UserRepository } from '../UserRepository';

class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(userDTO: UserDTO): Promise<User> {
    await Validators.validateObject(userDTO);

    await this.userAlreadyExists(userDTO.email);

    userDTO.password = await hash(userDTO.password, 8);

    const user = await this.userRepository.create(userDTO);

    return user;
  }

  private async userAlreadyExists(email: string): Promise<void> {
    const userAlreadyExists = await this.userRepository.exists(email);

    if (userAlreadyExists) {
      throw new HTTP400Error('User already exists!');
    }
  }
}

export { CreateUserService };
