import { Entry } from "@/types/Entry";
import { create } from "zustand";
import { getEntryData } from "../actions/data";
import { TablesEnum } from "../structures/TableStructure";

type EntryState = {
  entry: Entry | null;
  setEntry: (table: TablesEnum, id: number) => void;
  updateEntry: (fn: (prevState: Entry | null) => Entry | null) => void;
  clearEntry: () => void;
};

export const useEntryStore = create<EntryState>((set, get) => ({
  entry: null,
  setEntry: async (table, id) => {
    set({ entry: { id, table } });
    const data = await getEntryData(table, id);
    if (data) set({ entry: { id, table, data } });
  },
  updateEntry: (fn) => set((state) => ({ entry: fn(state.entry) })),
  clearEntry: () => set((state) => ({ entry: null })),
}));
