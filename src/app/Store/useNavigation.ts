import {create} from 'zustand'

type ApiState = {
    isCharSheetShown: boolean,
    setIsCharSheetShown: (status: boolean) => void;
}

export const useNavigation = create<ApiState>((set) => ({
    isCharSheetShown: false,
    setIsCharSheetShown: (status: boolean) => set({isCharSheetShown: status})
}))