import { create } from 'zustand'
import { HexagonDataType } from '../data-types/hexagonDataType'


type ApiState = {
    hexagonItems: HexagonDataType[];
    setHexagonItems: (newHexagonItems : HexagonDataType[]) => void;
};

export const useHexagonItems = create<ApiState>((set) => ({
    hexagonItems: [],
    setHexagonItems: (newHexagonItems) => set({hexagonItems: newHexagonItems}),
}))