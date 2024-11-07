"use client"; // This directive makes the component a client component

import React, { useState, useEffect } from 'react';
import './page.css';
import Aragorn from './characters/aragorn';
import OrcArcher from "./characters/orcArcher";
import OrcHunter from "./characters/orcHunter";
import Nazgul from "./characters/nazgul";
import Map from './components/map';
import Chat from './components/chat';

interface AragornPosition {
  x: number, 
  y: number
}

interface OrcArcherPosition {
  x: number, 
  y: number
}

interface OrcHunterPosition {
  x: number, 
  y: number
}

interface NazgulPosition {
  x: number, 
  y: number
}

const ZoomableImage: React.FC = ({ }) => {

  const [aragornPos, setAragornPos] = useState<AragornPosition>({ x: 0, y: 0 });
  const [orcArcherPos, setOrcArcherPos] = useState<OrcArcherPosition>({ x: 0, y: 0 });
  const [orcHunterPos, setOrcHunterPos] = useState<OrcHunterPosition>({ x: 0, y: 0 });
  const [nazgul, setNazgulPos] = useState<NazgulPosition>({ x: 0, y: 0 });
  const [zoomedMap, setZoomedMap] = useState<boolean>(false);

  const getAragornPosition = (position: any) => {
    setAragornPos(position)
  }

  const getOrchunterPosition = (position: any) => {
    setOrcHunterPos(position)
  }

  const getArcherPosition = (position: any) => {
    setOrcArcherPos(position)
  }

  const getNazgulPosition = (position: any) => {
    setNazgulPos(position)
  }


  return (
    <div className="hiddenOverflow ">
      <div className='leftColumn'>
        <Chat channelName="ably-chat-room"/>
        <div className='trackerStyle'>
          <div >{`Aragorn position: x: ${aragornPos.x} y:${aragornPos.y}`}</div>
          <div >{`Orc Archer position: x: ${orcArcherPos.x} y:${orcArcherPos.y}`}</div>
          <div >{`Orc Hunter position: x: ${orcHunterPos.x} y:${orcHunterPos.y}`}</div>
          <div >{`Nazgul position: x: ${nazgul.x} y:${nazgul.y}`}</div>
        </div>
      </div>
      <div className='rightColumn'>
        <Map/>
        <Aragorn channelName="ably-chat-room" getAragornPosition={getAragornPosition}/>
        <OrcArcher getArcherPosition={getArcherPosition}/>
        <OrcHunter getOrchunterPosition={getOrchunterPosition}/>
        <Nazgul getNazgulPosition={getNazgulPosition}/>
      </div>
    </div>
  );
};

export default ZoomableImage;
