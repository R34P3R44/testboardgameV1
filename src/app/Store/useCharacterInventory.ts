import { create } from 'zustand'
import { ItemAttributes } from "../../app/data-types/characterType";


type ApiState = {
  characterInventory: ItemAttributes[]; // Array of ItemAttributes
  setCharacterInventory: (newCharacterInventory: ItemAttributes[]) => void; // Accepts an array of ItemAttributes
};

export const useCharacterInventory = create<ApiState>((set) => ({
  characterInventory: [], // Starts as an empty array
  setCharacterInventory: (newCharacterInventory) => set({ characterInventory: newCharacterInventory }), // Sets the state with an array of items
}));