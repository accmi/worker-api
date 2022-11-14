import { User as UserModel, UserRole } from '@prisma/client';
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

@ObjectType()
export class User implements UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field(() => UserRole)
  role: UserRole;

  static createPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
