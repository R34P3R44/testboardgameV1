"use client"

import React, {useRef} from 'react';
import './MapStyle.css';
import Imperator from '../characters/imperator';


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

const Map: React.FC<MapProps> = ({isEndTurnClicked, resetTurnClick, showAragorn, dBPositions}) => {

    const mapRef = useRef<HTMLDivElement | null>(null);

    const items = [
        {
          key: 1,
          icon: "",
          tooltip: "A powerful sword for warriors.",
          visible: true,
          type: "Weapon",
          item: "Lond Sword",
          description: "Double-handed sword, good for massive strikes",
          weight: 2.7,
          qty: 1,
          isJunk: false
        },
        {
          key: 2,
          icon: "",
          tooltip: "A deadly ranged weapon.",
          visible: true,
          type: "Weapon",
          item: "Crossbow",
          description: "A short-range weapon that shoots bolts",
          weight: 4.3,
          qty: 1,
          isJunk: false
        },
        {
          key: 3,
          icon: "",
          tooltip: "A sturdy shield for protection.",
          visible: true,
          type: "Armor",
          item: "Shield",
          description: "Rohan shield, good for blocking strikes",
          weight: 2.4,
          qty: 1,
          isJunk: false
        },
        {
          key: 4,
          icon: "",
          tooltip: "A stash of gold coins.",
          visible: true,
          type: "Currency",
          item: "Coins",
          description: "Gold coins",
          weight: 0.2,
          qty: 20,
          isJunk: false
        },
        {
          key: 5,
          icon: "",
          tooltip: "A piece of cooked pork.",
          visible: true,
          type: "Consumable",
          item: "Pork Meat",
          description: "Can be used to heal wounds or restore stamina",
          weight: 1.1,
          qty: 1,
          isJunk: false
        },
        {
          key: 6,
          icon: "",
          tooltip: "A strong honey-based drink.",
          visible: true,
          type: "Consumable",
          item: "Mead",
          description: "A honey-based alcoholic drink",
          weight: 0.7,
          qty: 4,
          isJunk: false
        },
        {
          key: 7,
          icon: "",
          tooltip: "A simple cloth bandage.",
          visible: true,
          type: "Consumable",
          item: "Bandage",
          description: "A cloth roll to treat wounds",
          weight: 0.1,
          qty: 2,
          isJunk: false
        },
        {
          key: 8,
          icon: "",
          tooltip: "A precious gemstone.",
          visible: true,
          type: "Misc",
          item: "Gem Stone",
          description: "A precious piece of stone, can be sold to traders",
          weight: 0.4,
          qty: 1,
          isJunk: false
        },
        {
          key: 9,
          icon: "",
          tooltip: "A small but sharp blade.",
          visible: true,
          type: "Weapon",
          item: "Iron Dagger",
          description: "A lightweight dagger, easy to handle",
          weight: 0.9,
          qty: 1,
          isJunk: false
        },
        {
          key: 10,
          icon: "",
          tooltip: "A scroll containing arcane knowledge.",
          visible: true,
          type: "Misc",
          item: "Magic Scroll",
          description: "Contains a powerful spell",
          weight: 0.3,
          qty: 2,
          isJunk: false
        },
      ];

    return (
        // <div className='maps-container' ref={mapRef}>
        <>
            <div className='testmap'></div>
            {/* <div className='testmap2'></div> */}
            {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
                <Imperator dBPositions={dBPositions} isEndTurnClicked={isEndTurnClicked} resetTurnClick={resetTurnClick} mapRef={mapRef} />
                :
                null
            }

        </>
    )
}

export default Map;
