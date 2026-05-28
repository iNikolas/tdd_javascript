import db, { todoTable } from 'shared/db';

describe('DbProvider', () => {
  it('test saving and retrieving items', async () => {
    const [item1] = await db
      .insert(todoTable)
      .values({ text: 'The first (ever) list item' })
      .returning();
    const [item2] = await db
      .insert(todoTable)
      .values({ text: '"Item the second"' })
      .returning();

    const items = await db.select().from(todoTable);

    expect(items).toHaveLength(2);

    expect(items).toEqual([
      expect.objectContaining({
        id: item1.id,
        text: 'The first (ever) list item',
      }),
      expect.objectContaining({
        id: item2.id,
        text: '"Item the second"',
      }),
    ]);
  });
});
