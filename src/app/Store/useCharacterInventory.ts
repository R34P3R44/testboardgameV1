import {create} from 'zustand'
import { ItemAttributes } from "../../app/data-types/characterType";

type ApiState = {
    characterInventory: ItemAttributes | null,
    setCharacterInventory: (newCharacterInventory: ItemAttributes) => void
}

export const useCharacterInventory = create<ApiState>((set) => ({
    characterInventory: null,
    setCharacterInventory: (newCharacterInventory) => set({characterInventory: newCharacterInventory})
}))