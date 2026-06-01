import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

import { todoTable, dbSchema } from 'shared/db';

describe('DbProvider - Pure PGlite Test', () => {
  let pgLite: PGlite;
  let db: ReturnType<typeof drizzle>;

  beforeAll(() => {
    pgLite = new PGlite();
    db = drizzle(pgLite, { schema: dbSchema });
  });

  beforeEach(async () => {
    await db.delete(todoTable);
  });

  afterAll(async () => {
    await pgLite.close();
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
