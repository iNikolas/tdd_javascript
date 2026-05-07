import { Inject } from '@nestjs/common';

import db from './client';
import { provide } from './constants';

export const InjectDb = () => Inject(provide);

export const dbProvider = {
  provide,
  useValue: db,
};
