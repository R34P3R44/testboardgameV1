import {create} from 'zustand'
import { CharacterAttributes } from "../../app/data-types/characterType";

type ApiState = {
    characterAttributes: CharacterAttributes | null,
    setCharacterAttributes: (newCharacterAttr: CharacterAttributes) => void
}

export const useCharacterAttributes = create<ApiState>((set) => ({
    characterAttributes: null,
    setCharacterAttributes: (newCharacterAttr) => set({characterAttributes: newCharacterAttr})
}))
