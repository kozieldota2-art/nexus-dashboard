import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const decisions=sqliteTable("decisions",{id:integer("id").primaryKey({autoIncrement:true}),title:text("title").notNull(),context:text("context").notNull().default(""),rationale:text("rationale").notNull().default(""),impact:text("impact").notNull().default(""),status:text("status").notNull().default("Ativa"),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
