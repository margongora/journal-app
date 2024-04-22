import { date, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const journals = pgTable(
    'journals',
    {
        id: serial('id').primaryKey(),
        date_created: date('date_created').defaultNow(),
        title: varchar('title'),
        content: text('content'),
    }
);

export type Journal = typeof journals.$inferSelect;
export type NewJournal = typeof journals.$inferInsert;