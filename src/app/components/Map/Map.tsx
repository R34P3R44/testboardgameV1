"use client"

import React, { useRef, useState, useEffect } from 'react';
import './MapStyle.css';
import Imperator from '../characters/imperator';
import Item from '../Item/Item';
import { ItemAttributes } from '@/app/data-types/characterType';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
import { getCharacterInventory } from '@/app/_restApiFn/getCharacterInventory';


interface MapProps {
  dBPositions: CharacterPosition[];
  showAragorn: boolean;
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
}

type CharacterPosition = {
  charId: string;
  active: boolean;
  latestPositions: {
    x: number | null;
    y: number | null;
    dateTime: string | null;
  } | null;
};

const Map: React.FC<MapProps> = ({ isEndTurnClicked, resetTurnClick, showAragorn, dBPositions }) => {

  const [showItem1, setshowItem1] = useState<boolean>(false);
  const [showItem2, setshowItem2] = useState<boolean>(false);
  const [currentItem1, setCurrentItem1] = useState<ItemAttributes | null>(null);
  const [currentItem2, setCurrentItem2] = useState<ItemAttributes | null>(null);
  const { characterInventory, setCharacterInventory } = useCharacterInventory();

    const items: ItemAttributes[] = [
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
        positionX: 700,
        positionY: 610,
      },

    },
    // {
    //   id: 3,
    //   charId: "",
    //   itemData: {
    //     visible: true,
    //     type: "HA",
    //     item: "Shield",
    //     description: "Rohan shield, good for blocking strikes",
    //     weight: 2.4,
    //     qty: 1,
    //     isJunk: false,
    //     positionX: 780,
    //     positionY: 610,
    //   },

    // },
    // {
    //   id: 4,
    //   charId: "",
    //   itemData: {
    //     visible: true,
    //     type: "Currency",
    //     item: "Coins",
    //     description: "Gold coins",
    //     weight: 0.2,
    //     qty: 20,
    //     isJunk: false,
    //     positionX: 690,
    //     positionY: 610,
    //   },
    // },
  ];


  useEffect(() => {
    // const currentRandomItem1 = getCurrentItem1()
    // const currentRandomItem2 = getCurrentItem2()
    const currentRandomItem1 = items[0];
    const currentRandomItem2 = items[1];

    setCurrentItem1(currentRandomItem1)
    setCurrentItem2(currentRandomItem2)
    
    setshowItem1(true)
    setshowItem2(true)
  }, []);

  useEffect(() => {
    
    if(dBPositions){
      const fetchInventory = async () => {
        if (dBPositions[0]) {
          try {
            const data = await getCharacterInventory(dBPositions[0].charId);
            const allInventoryItems: ItemAttributes[] = [...data, ...characterInventory]
            setCharacterInventory(allInventoryItems);
            console.log("Set inventroy data done");
          } catch (error) {
            console.error("Error fetching character inventory:", error);
          }
        }
      };
      fetchInventory();  
    }
    // else {
    //   allInventoryItems = [...data, ...characterInventory]
    //   setCharacterInventory(allInventoryItems);
    // }
  }, [dBPositions]);

  useEffect(() => {
    if(characterInventory.length){
      if(characterInventory[0].itemData.visible === false){
        setshowItem1(false)
      }
      else if(characterInventory[1].itemData.visible === false){
        setshowItem2(false)
      }  
    }
  }, [characterInventory]);

  // const getCurrentItem1 = () => {
  //   const randomItem: number = Math.floor(Math.random() * items.length) + 1;
  //   return items[randomItem]
  // }

  // const getCurrentItem2 = () => {
  //   const randomItem: number = Math.floor(Math.random() * items.length) + 1;
  //   return items[randomItem]
  // }

  const mapRef = useRef<HTMLDivElement | null>(null);


  return (
    <>
      <div className='testmap'></div>
      {/* <div className='testmap2'></div> */}
      {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
        <Imperator dBPositions={dBPositions} isEndTurnClicked={isEndTurnClicked} resetTurnClick={resetTurnClick} mapRef={mapRef} />
        :
        null
      }

      {showItem1 ?
        <Item currentItem={currentItem1} charId={dBPositions[0]?.charId} indexId={`inventory-item-${currentItem1?.itemData.item}`}/>
        :
        null
      }

      {showItem2 ?
        <Item currentItem={currentItem2} charId={dBPositions[1]?.charId} indexId={`inventory-item-${currentItem2?.itemData.item}`}/>
        :
        null
      }

    </>
  )
}

export default Map;
