import {create} from 'zustand'

type ApiState = {
    isCharacterSelected: boolean,
    setCharacterSelected: (status: boolean) => void;
}

export const useSelectedCharacter = create<ApiState>((set) => ({
    isCharacterSelected: false,
    setCharacterSelected: (status: boolean) => set({isCharacterSelected: status})
}))