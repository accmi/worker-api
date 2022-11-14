import { PrismaService } from './../prisma.service';
import { SignInInput } from './../../dist/types/graphql.d';
import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup.input';
import { AuthResponse } from './dto/auth.reponse';
import { User } from './entities/user.entity';
import { PrismaError } from 'prisma-error-enum';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async signup({
    email,
    firstName,
    lastName,
    role,
    password,
  }: SignUpInput): Promise<AuthResponse> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          role,
          password: User.createPassword(password),
        },
      });

      if (user) {
        return {
          token: '',
        };
      }
    } catch (error) {
      if (
        error.code === PrismaError.UniqueConstraintViolation &&
        error.meta.target[0] === 'email'
      ) {
        throw new ConflictException(
          'unique_email',
          'This email is already registered by another user',
        );
      }

      throw error;
    }
  }

  signin(signInInput: SignInInput) {
    return signInInput;
  }

  whoami() {
    return 'Hello its me';
  }

  logout() {
    return 'logging out';
  }
}
