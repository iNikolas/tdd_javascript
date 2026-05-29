import { Inject } from '@nestjs/common';

import db from 'shared/db';

import { provide } from './constants';

export const InjectDb = () => Inject(provide);

export const dbProvider = {
  provide,
  useValue: db,
};
