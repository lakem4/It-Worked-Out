import { Router, type IRouter } from "express";
import { eq, asc, lte, and } from "drizzle-orm";
import { db, stressEntriesTable } from "@workspace/db";
import {
  ListEntriesResponse,
  CreateEntryBody,
  GetEntryParams,
  GetEntryResponse,
  UpdateEntryParams,
  UpdateEntryBody,
  UpdateEntryResponse,
  DeleteEntryParams,
  GetStatsResponse,
  ListDueForReflectionResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/entries", async (req, res): Promise<void> => {
  const entries = await db
    .select()
    .from(stressEntriesTable)
    .orderBy(asc(stressEntriesTable.reflectionDate));
  res.json(ListEntriesResponse.parse(entries));
});

router.post("/entries", async (req, res): Promise<void> => {
  const parsed = CreateEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { description, loggedDate, reflectionDate } = parsed.data;

  const [entry] = await db
    .insert(stressEntriesTable)
    .values({
      description,
      loggedDate: loggedDate instanceof Date
        ? loggedDate.toISOString().split("T")[0]
        : String(loggedDate),
      reflectionDate: reflectionDate instanceof Date
        ? reflectionDate.toISOString().split("T")[0]
        : String(reflectionDate),
      status: "pending",
    })
    .returning();

  res.status(201).json(GetEntryResponse.parse(entry));
});

router.get("/entries/stats", async (req, res): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];

  const allEntries = await db.select().from(stressEntriesTable);

  const total = allEntries.length;
  const pending = allEntries.filter((e) => e.status === "pending").length;
  const workedOut = allEntries.filter((e) => e.status === "worked_out").length;
  const stillStressing = allEntries.filter((e) => e.status === "still_stressing").length;
  const dueForReflection = allEntries.filter(
    (e) => e.status === "pending" && e.reflectionDate <= today
  ).length;

  res.json(
    GetStatsResponse.parse({
      total,
      pending,
      workedOut,
      stillStressing,
      dueForReflection,
    })
  );
});

router.get("/entries/due-for-reflection", async (req, res): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];

  const entries = await db
    .select()
    .from(stressEntriesTable)
    .where(
      and(
        eq(stressEntriesTable.status, "pending"),
        lte(stressEntriesTable.reflectionDate, today)
      )
    )
    .orderBy(asc(stressEntriesTable.reflectionDate));

  res.json(ListDueForReflectionResponse.parse(entries));
});

router.get("/entries/:id", async (req, res): Promise<void> => {
  const params = GetEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [entry] = await db
    .select()
    .from(stressEntriesTable)
    .where(eq(stressEntriesTable.id, params.data.id));

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(GetEntryResponse.parse(entry));
});

router.patch("/entries/:id", async (req, res): Promise<void> => {
  const params = UpdateEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.description !== undefined) updateData.description = parsed.data.description;
  if (parsed.data.status !== undefined) updateData.status = parsed.data.status;
  if (parsed.data.loggedDate !== undefined) {
    updateData.loggedDate = parsed.data.loggedDate instanceof Date
      ? parsed.data.loggedDate.toISOString().split("T")[0]
      : String(parsed.data.loggedDate);
  }
  if (parsed.data.reflectionDate !== undefined) {
    updateData.reflectionDate = parsed.data.reflectionDate instanceof Date
      ? parsed.data.reflectionDate.toISOString().split("T")[0]
      : String(parsed.data.reflectionDate);
  }

  const [entry] = await db
    .update(stressEntriesTable)
    .set(updateData)
    .where(eq(stressEntriesTable.id, params.data.id))
    .returning();

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json(UpdateEntryResponse.parse(entry));
});

router.delete("/entries/:id", async (req, res): Promise<void> => {
  const params = DeleteEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [entry] = await db
    .delete(stressEntriesTable)
    .where(eq(stressEntriesTable.id, params.data.id))
    .returning();

  if (!entry) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
