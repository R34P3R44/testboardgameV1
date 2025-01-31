import {create} from 'zustand'

type ApiState = {
    isCharacterSelected: boolean,
    setIsCharacterSelected: (status: boolean) => void;
}

export const useSelectedCharacter = create<ApiState>((set) => ({
    isCharacterSelected: false,
    setIsCharacterSelected: (status: boolean) => set({isCharacterSelected: status})
}))