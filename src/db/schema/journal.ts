import { date, pgTable, serial, text } from "drizzle-orm/pg-core";

export const Journal = pgTable(
    'journals',
    {
        id: serial('id').primaryKey(),
        date_created: date('date_created').defaultNow(),
        content: text('content'),
    }
)