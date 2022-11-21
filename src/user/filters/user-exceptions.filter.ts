import { PrismaError } from 'prisma-error-enum';
import {
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class UserExceptionsFilter implements ExceptionFilter {
  catch(exception: any) {
    let modifiedException: HttpException;
    if (
      exception.code === PrismaError.UniqueConstraintViolation &&
      exception.meta.target[0] === 'email'
    ) {
      modifiedException = new ConflictException(
        'unique_email',
        'This email is already registered by another user',
      );
    }

    if (exception.code === PrismaError.RecordsNotFound) {
      modifiedException = new BadRequestException(
        `User with this email don't exist`,
      );
    }

    if (exception.message === 'PASSWORDS_DONT_MATCH') {
      modifiedException = new BadRequestException('Incorect password');
    }

    if (exception.name === 'NotFoundError') {
      modifiedException = new BadRequestException('User not found');
    }

    return modifiedException;
  }
}
