import {create} from 'zustand'
import { GameMenuNav } from '../data-types/characterType'

type ApiState = {
    activeGameMenuItem: GameMenuNav ,
    setActiveGameMenuItem: (status: GameMenuNav) => void;
}

export const useGameMenuNavigation = create<ApiState>((set) => ({
    activeGameMenuItem: null as GameMenuNav,
    setActiveGameMenuItem: (status: GameMenuNav) => set({activeGameMenuItem: status})
}))