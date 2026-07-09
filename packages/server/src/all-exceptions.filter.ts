import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DrizzleQueryError } from 'drizzle-orm';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly constraintErrors: Record<string, Error> = {
    '23505': new ConflictException(
      'A unique constraint violation occurred. The provided value already exists in the database.',
    ),
    '23503': new BadRequestException(
      'A foreign key constraint violation occurred. The provided value does not exist in the referenced table.',
    ),
  };

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof DrizzleQueryError) {
      const dbErrorCode =
        exception.cause != null &&
        'code' in exception.cause &&
        typeof exception.cause.code === 'string'
          ? exception.cause.code
          : null;

      if (dbErrorCode && this.constraintErrors[dbErrorCode]) {
        return super.catch(this.constraintErrors[dbErrorCode], host);
      }

      return super.catch(
        new InternalServerErrorException(
          `An unexpected database error occurred: ${dbErrorCode}`,
        ),
        host,
      );
    }

    super.catch(exception, host);
  }
}
