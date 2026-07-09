import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { DrizzleQueryError } from 'drizzle-orm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof DrizzleQueryError) {
      // Handle DrizzleQueryError specifically
      console.log('DrizzleQueryError: ', exception);
    } else {
      // Handle other exceptions
      console.log('Other Exception: ', exception);
    }

    super.catch(exception, host);
  }
}
