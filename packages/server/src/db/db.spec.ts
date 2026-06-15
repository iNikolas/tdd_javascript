import { drizzle } from 'drizzle-orm/pglite';

import { todoTable, listTable } from 'shared/db';
import { initLiteDatabase } from './db.utils';

describe('DbProvider - Pure PGlite Test', () => {
  let db: ReturnType<typeof drizzle>;

  beforeAll(async () => {
    db = await initLiteDatabase();
  });

  beforeEach(async () => {
    await db.delete(todoTable);
    await db.delete(listTable);
  });

  it('test saving and retrieving items', async () => {
    const [list] = await db.insert(listTable).values({}).returning();

    const [item1] = await db
      .insert(todoTable)
      .values({ text: 'The first (ever) list item', listId: list.id })
      .returning();

    const [item2] = await db
      .insert(todoTable)
      .values({ text: 'The second list item', listId: list.id })
      .returning();

    const items = await db.select().from(todoTable);

    expect(items).toHaveLength(2);
    expect(items[0]).toEqual(
      expect.objectContaining({
        id: item1.id,
        text: 'The first (ever) list item',
      }),
    );
    expect(items[1]).toEqual(
      expect.objectContaining({
        id: item2.id,
        text: 'The second list item',
      }),
    );
  });
});
