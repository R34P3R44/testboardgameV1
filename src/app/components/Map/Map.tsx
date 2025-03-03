"use client"

import React, { useRef, useState, useEffect, memo } from 'react';
import './MapStyle.css';
import Imperator from '../characters/imperator';
import Item from '../Item/Item';
import { ItemAttributes } from '@/app/data-types/characterType';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
import { getCharacterInventory } from '@/app/_restApiFn/getCharacterInventory';
import { useMapItems } from '@/app/Store/useMapItems';
import Spinner from '../Misc/Spinner';
import { CharacterPosition } from '@/app/data-types/characterType';



interface MapProps {
  dBPositions: CharacterPosition[];
  showAragorn: boolean;
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
}

// type CharacterPosition = {
//   charId: string;
//   active: boolean;
//   latestPositions: {
//     x: number | null;
//     y: number | null;
//     dateTime: string | null;
//   } | null;
// };

const Map: React.FC<MapProps> = ({ isEndTurnClicked, resetTurnClick, showAragorn, dBPositions }) => {

  const { characterInventory, setCharacterInventory } = useCharacterInventory();
  const { mapItems, setMapItems } = useMapItems();
  const [loading, setLoading] = useState<boolean>(false)
  const mapRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (mapItems.length && characterInventory.length) {
      setLoading(true)
      setInterval(() => setLoading(false), 1000)
    }
  }, [mapItems, characterInventory]);

  return (
    <>
      {loading ?
        <div className='z-50'>
          <Spinner />
        </div>
        :
        null
      }
      <>
        <div className='testmap'></div>
        {/* <div className='testmap2'></div> */}
        {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
          <Imperator
            dBPositions={dBPositions}
            isEndTurnClicked={isEndTurnClicked}
            resetTurnClick={resetTurnClick}
            mapRef={mapRef}
          />
          :
          null
        }

        {dBPositions[0] && mapItems.map((item) => (
          item.itemData.visible && <Item key={item.id} currentItem={item} charId={dBPositions[0].charId} />
        ))}
      </>

    </>
  )
}

export default Map;
