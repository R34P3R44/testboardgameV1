import { create } from 'zustand'
import { ItemAttributes } from "../../app/data-types/characterType";


type ApiState = {
  mapItems: ItemAttributes[]; 
  setMapItems: (newMapItems: ItemAttributes[]) => void;
};

export const useMapItems = create<ApiState>((set) => ({
    mapItems: [
        {
          id: 1,
          charId: "",
          itemData: {
            visible: true,
            type: "CCW",
            item: "Long Sword",
            description: "Double-handed sword, good for massive strikes",
            weight: 2.7,
            qty: 1,
            isJunk: false,
            positionX: 630,
            positionY: 650,
          },
        },
        {
          id: 2,
          charId: "",
          itemData: {
            visible: true,
            type: "LRW",
            item: "Crossbow",
            description: "A short-range weapon that shoots bolts",
            weight: 4.3,
            qty: 1,
            isJunk: false,
            positionX: 900,
            positionY: 610,
          },
    
        },
        {
          id: 3,
          charId: "",
          itemData: {
            visible: true,
            type: "HA",
            item: "Shield",
            description: "Rohan shield, good for blocking strikes",
            weight: 2.4,
            qty: 1,
            isJunk: false,
            positionX: 780,
            positionY: 610,
          },
    
        },
        {
          id: 4,
          charId: "",
          itemData: {
            visible: true,
            type: "Currency",
            item: "Coins",
            description: "Gold coins",
            weight: 0.2,
            qty: 20,
            isJunk: false,
            positionX: 690,
            positionY: 610,
          },
        },
      ],
    setMapItems: (newMapItems) => set({ mapItems: newMapItems }),
}));