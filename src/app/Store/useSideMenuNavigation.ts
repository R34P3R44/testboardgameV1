import {create} from 'zustand'
import { SideMenuNav } from '../data-types/characterType'

type ApiState = {
    activeSideMenuItem: SideMenuNav ,
    setActiveSideMenuItem: (status: SideMenuNav) => void;
}

export const useSideMenuNavigation = create<ApiState>((set) => ({
    activeSideMenuItem: '' as SideMenuNav,
    setActiveSideMenuItem: (status: SideMenuNav) => set({activeSideMenuItem: status})
}))