import { User } from '.prisma/client';
import { HTTP400Error } from '@exceptions/HTTP400Error';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from 'src/configProperties';
import { UserRepository } from '../UserRepository';

interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: IAuthenticateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HTTP400Error('Email/Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HTTP400Error('Email/Password incorrect');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const token = sign({
      email: user.email
    }, JWT_SECRET_KEY as Secret, {
      subject: user.id,
      expiresIn: '1d'
    });

    return token;
  }
}

export { AuthenticateUserService };
