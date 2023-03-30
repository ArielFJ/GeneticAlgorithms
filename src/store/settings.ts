import { create } from "zustand";

interface SettingsStore {
  expectedPhrase: string;
  bestPhrase: string;
  generation: number;
  avgFitness: number;
  totalPopulation: number;
  mutationRate: number;
  setExpectedPhrase: (phrase: string) => void;
  setBestPhrase: (phrase: string) => void;
  increaseGeneration: () => void;
  reset: () => void;
}

const useSettingsStore = create<SettingsStore>((set, get) => ({
  expectedPhrase: "Hello World",
  bestPhrase: "",
  generation: 0,
  avgFitness: 0.0,
  totalPopulation: 100,
  mutationRate: 0.01,
  setExpectedPhrase: (phrase: string) => set({ expectedPhrase: phrase }),
  setBestPhrase: (phrase: string) => set({ bestPhrase: phrase }),
  increaseGeneration: () => set({ generation: get().generation + 1 }),
  reset: () => set({ generation: 0, bestPhrase: "" }),
}));

export default useSettingsStore;