import { OkResponse } from '../shared/ok.response';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { AuthResponse } from './dto/auth.reponse';
import { WhoAmIResponse } from './dto/whoami.response';
import { UseFilters } from '@nestjs/common';
import { UserExceptionsFilter } from './filters/user-exceptions.filter';

@Resolver(() => User)
@UseFilters(new UserExceptionsFilter())
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AuthResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput): Promise<AuthResponse> {
    return this.userService.signup(signUpInput);
  }

  @Mutation(() => AuthResponse)
  signin(@Args('signInInput') signInInput: SignInInput): Promise<AuthResponse> {
    return this.userService.signin(signInInput);
  }

  @Query(() => WhoAmIResponse, { name: 'whoami' })
  whoami() {
    return this.userService.whoami();
  }

  @Query(() => OkResponse, { name: 'logout' })
  logout() {
    return this.userService.logout();
  }
}
