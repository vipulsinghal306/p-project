import { create } from "zustand";

export type Section = "home" | "history" | "discover";

interface SectionState {
  section: Section;
  setSection: (section: Section) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  section: "home",
  setSection: (section) => set({ section }),
})); 