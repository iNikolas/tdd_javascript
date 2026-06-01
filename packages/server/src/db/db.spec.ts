import { drizzle } from 'drizzle-orm/pglite';

import { todoTable } from 'shared/db';
import { initLiteDatabase } from './db.utils';

describe('DbProvider - Pure PGlite Test', () => {
  let db: ReturnType<typeof drizzle>;

  beforeAll(async () => {
    db = await initLiteDatabase();
  });

  beforeEach(async () => {
    await db.delete(todoTable);
  });

  it('test saving and retrieving items in memory', async () => {
    const [item1] = await db
      .insert(todoTable)
      .values({ text: 'The first (ever) list item' })
      .returning();

    const items = await db.select().from(todoTable);

    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(
      expect.objectContaining({
        id: item1.id,
        text: 'The first (ever) list item',
      }),
    );
  });
});
