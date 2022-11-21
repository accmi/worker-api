import { PrismaService } from './../prisma.service';
import { SignInInput } from './../../dist/types/graphql.d';
import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup.input';
import { AuthResponse } from './dto/auth.reponse';
import { User } from './entities/user.entity';

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
    await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password: User.createPassword(password),
      },
    });

    return {
      token: '',
    };
  }

  async signin({ email, password }: SignInInput): Promise<AuthResponse> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    if (!User.passwordsMatch(password, user.password)) {
      throw new Error('PASSWORDS_DONT_MATCH');
    }

    return {
      token: '',
    };
  }

  whoami() {
    return 'Hello its me';
  }

  logout() {
    return 'logging out';
  }
}
