"use client"

import React, { useRef, useEffect } from 'react';
import './MapStyle.css';
import Imperator from '../characters/imperator';
import Item from '../Item/Item';
import { useMapItems } from '@/app/Store/useMapItems';
import { CharacterPosition, EnemyPosition } from '@/app/data-types/characterType';
import Enemy from '../characters/Enemy/Enemy';
import HoneycombGrid from './HexagonGrid';
import Image from 'next/image';


interface MapProps {
  dBPositions: CharacterPosition[];
  showAragorn: boolean;
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
  mapIdRef: string;
  enemyPositions: EnemyPosition[]
  showGrid: boolean
}

const Map: React.FC<MapProps> = ({ isEndTurnClicked, resetTurnClick, showAragorn, dBPositions, mapIdRef, enemyPositions, showGrid }) => {

  const { mapItems } = useMapItems();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const viewableScreenHeight = window.innerHeight;
  const viewableScreenWidth = window.innerWidth;

  document.documentElement.style.setProperty('--screen-height', viewableScreenHeight.toString());
  document.documentElement.style.setProperty('--screen-width', viewableScreenWidth.toString())

  const pixelRatio = window.devicePixelRatio || 1;
  document.documentElement.style.setProperty('--pixel-ratio', pixelRatio.toString());

  return (

    <div className='map-container'>
      <Image
        key={mapIdRef}
        className='testmap'
        src={"/Field_Demo_v1.jpg"}
        alt="Map"
        width={6000}
        height={5000}
      />

      {enemyPositions && enemyPositions.map((item) => (
        <Enemy
          key={item.id}
          currentEnemy={{
            latestPositions: item.latestPositions,
            charId: item.charId,
            active: item.active,
            category: item.category,
            id: item.id
          }}
          enemy={item}
          enemyPositions={enemyPositions}
          isEndTurnClicked={isEndTurnClicked}
          resetTurnClick={resetTurnClick}
          mapRef={mapRef}
        />
      ))}

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

      {dBPositions.length > 0 && mapItems.length > 0 && mapItems.map((item) => (
        item.itemData.visible && <Item key={item.id} currentItem={item} charId={dBPositions[0].charId} />
      ))}

      {showGrid ?
        <HoneycombGrid />
        :
        null
      }
    </div>
  )
}

export default Map;
