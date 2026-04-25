import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const ENTRIES_TABLE = "stress_entries";

export type EntryStatus = "pending" | "worked_out" | "still_stressing";

export interface StressEntry {
  id: number;
  description: string;
  loggedDate: string;
  reflectionDate: string;
  status: EntryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewStressEntry {
  description: string;
  loggedDate: string;
  reflectionDate: string;
}

export interface StressEntryUpdate {
  description?: string;
  loggedDate?: string;
  reflectionDate?: string;
  status?: EntryStatus;
}

export interface StressStats {
  total: number;
  pending: number;
  workedOut: number;
  stillStressing: number;
  dueForReflection: number;
}

interface DbRow {
  id: number;
  description: string;
  logged_date: string;
  reflection_date: string;
  status: EntryStatus;
  created_at: string;
  updated_at: string;
}

function fromDb(row: DbRow): StressEntry {
  return {
    id: row.id,
    description: row.description,
    loggedDate: row.logged_date,
    reflectionDate: row.reflection_date,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export const entriesKeys = {
  all: ["entries"] as const,
  list: () => [...entriesKeys.all, "list"] as const,
  stats: () => [...entriesKeys.all, "stats"] as const,
  due: () => [...entriesKeys.all, "due"] as const,
};

export function useListEntries() {
  return useQuery({
    queryKey: entriesKeys.list(),
    queryFn: async (): Promise<StressEntry[]> => {
      const { data, error } = await supabase
        .from(ENTRIES_TABLE)
        .select("*")
        .order("reflection_date", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as DbRow[]).map(fromDb);
    },
  });
}

export function useGetStats() {
  return useQuery({
    queryKey: entriesKeys.stats(),
    queryFn: async (): Promise<StressStats> => {
      const { data, error } = await supabase
        .from(ENTRIES_TABLE)
        .select("status, reflection_date");
      if (error) throw error;
      const today = todayISO();
      const rows = (data ?? []) as Array<{
        status: EntryStatus;
        reflection_date: string;
      }>;
      return {
        total: rows.length,
        pending: rows.filter((r) => r.status === "pending").length,
        workedOut: rows.filter((r) => r.status === "worked_out").length,
        stillStressing: rows.filter((r) => r.status === "still_stressing").length,
        dueForReflection: rows.filter(
          (r) => r.status === "pending" && r.reflection_date <= today,
        ).length,
      };
    },
  });
}

export function useListDueForReflection() {
  return useQuery({
    queryKey: entriesKeys.due(),
    queryFn: async (): Promise<StressEntry[]> => {
      const { data, error } = await supabase
        .from(ENTRIES_TABLE)
        .select("*")
        .eq("status", "pending")
        .lte("reflection_date", todayISO())
        .order("reflection_date", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as DbRow[]).map(fromDb);
    },
  });
}

function invalidateAll(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: entriesKeys.list() });
  queryClient.invalidateQueries({ queryKey: entriesKeys.stats() });
  queryClient.invalidateQueries({ queryKey: entriesKeys.due() });
}

export function useCreateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: NewStressEntry }): Promise<StressEntry> => {
      const { data: row, error } = await supabase
        .from(ENTRIES_TABLE)
        .insert({
          description: data.description,
          logged_date: data.loggedDate,
          reflection_date: data.reflectionDate,
          status: "pending",
        })
        .select()
        .single();
      if (error) throw error;
      return fromDb(row as DbRow);
    },
    onSuccess: () => invalidateAll(queryClient),
  });
}

export function useUpdateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: StressEntryUpdate;
    }): Promise<StressEntry> => {
      const updatePayload: Record<string, unknown> = {};
      if (data.description !== undefined) updatePayload.description = data.description;
      if (data.status !== undefined) updatePayload.status = data.status;
      if (data.loggedDate !== undefined) updatePayload.logged_date = data.loggedDate;
      if (data.reflectionDate !== undefined) updatePayload.reflection_date = data.reflectionDate;

      const { data: row, error } = await supabase
        .from(ENTRIES_TABLE)
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return fromDb(row as DbRow);
    },
    onSuccess: () => invalidateAll(queryClient),
  });
}

export function useDeleteEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }): Promise<void> => {
      const { error } = await supabase.from(ENTRIES_TABLE).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => invalidateAll(queryClient),
  });
}
