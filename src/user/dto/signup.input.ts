import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
