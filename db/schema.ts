import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const decisions=sqliteTable("decisions",{id:integer("id").primaryKey({autoIncrement:true}),title:text("title").notNull(),context:text("context").notNull().default(""),rationale:text("rationale").notNull().default(""),impact:text("impact").notNull().default(""),status:text("status").notNull().default("Ativa"),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});

export const knowledgeNodes = sqliteTable(
  "knowledge_nodes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    kind: text("kind").notNull().default("note"),
    status: text("status").notNull().default("active"),
    projectId: text("project_id"),
    sourceUrl: text("source_url"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("knowledge_nodes_kind_status_idx").on(table.kind, table.status),
    index("knowledge_nodes_project_idx").on(table.projectId),
  ],
);

export const knowledgeLinks = sqliteTable(
  "knowledge_links",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fromNodeId: integer("from_node_id").notNull().references(() => knowledgeNodes.id, { onDelete: "cascade" }),
    toNodeId: integer("to_node_id").notNull().references(() => knowledgeNodes.id, { onDelete: "cascade" }),
    relation: text("relation").notNull().default("references"),
    context: text("context").notNull().default(""),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("knowledge_links_from_idx").on(table.fromNodeId),
    index("knowledge_links_to_idx").on(table.toNodeId),
  ],
);

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  color: text("color").notNull().default("#72f1b8"),
});

export const nodeTags = sqliteTable(
  "node_tags",
  {
    nodeId: integer("node_id").notNull().references(() => knowledgeNodes.id, { onDelete: "cascade" }),
    tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.nodeId, table.tagId] })],
);

export const revisions = sqliteTable(
  "revisions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nodeId: integer("node_id").notNull().references(() => knowledgeNodes.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    reason: text("reason").notNull().default("manual edit"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("revisions_node_idx").on(table.nodeId)],
);
