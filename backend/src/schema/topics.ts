import { pgTable, serial, text, json } from "drizzle-orm/pg-core";

export const topicsTable = pgTable("topics", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  grade: text("grade").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  board: text("board"),
  keywords: json("keywords").$type<string[]>().default([]),
  gameType: text("game_type"),
  difficulty: text("difficulty"),
  gameUrl: text("game_url"),
});

export type Topic = typeof topicsTable.$inferSelect;
