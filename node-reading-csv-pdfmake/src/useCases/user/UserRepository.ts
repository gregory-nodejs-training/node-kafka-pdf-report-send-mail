import { client } from '@database/client';
import { IRepository } from '@database/IRepository';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { User } from '@prisma/client';
import { UserDTO } from './models/UserDTO';

class UserRepository implements IRepository<UserDTO, User> {
  async create(userDTO: UserDTO): Promise<User> {
    const user = await client.user.create({
      data: userDTO
    });

    if (!user) {
      throw new HTTP400Error('Error creating user.');
    }

    return user;
  }

  async exists(email: string): Promise<Boolean> {
    const user = await client.user.findUnique({
      where: {
        email
      }
    });
    return !!user;
  }

  async listAll(): Promise<User[]> {
    const users = await client.user.findMany();

    if (!users) {
      throw new HTTP400Error('Users not found.');
    }

    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await client.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
}

export { UserRepository };
