"use client"; // This directive makes the component a client component

import React, { useState, useEffect } from 'react';
import './page.css';
import Aragorn from './characters/aragorn';
// import OrcArcher from "./characters/orcArcher";
// import OrcHunter from "./characters/orcHunter";
// import Nazgul from "./characters/nazgul";
import Map from './components/map';
// import Chat from './components/chat';

interface AragornPosition {
  x: number | null;
  y: number | null;
  dateTime: Date | null; // Not optional
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

  const [showAragorn, setShowAragorn] = useState<boolean>(false);

  const [dBPosition, setDBPosition] = useState<AragornPosition>({ x: 0, y: 0, dateTime: new Date()});


  useEffect(() => {
    const fetchposition = async () => {
      const res = await fetch('/api/get-position');
      if(res.ok){
        const data = await res.json();
        const respData = data.positions
        const latestPlayerMove = Array.isArray(respData) ?  [...respData].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
        if(latestPlayerMove === undefined || latestPlayerMove === null) {
          setDBPosition({x: 0, y: 0, dateTime: new Date()})
          setShowAragorn(true)  
        }
        else {
          setDBPosition({x: latestPlayerMove[0].x, y: latestPlayerMove[0].y, dateTime: latestPlayerMove[0].dateTime})
          setShowAragorn(true) 

        }
      }
      else {
        setDBPosition({x: 0, y: 0, dateTime: new Date()})
        setShowAragorn(true)  
      }
    }
  
    fetchposition()
    
  }, []);


  // const getAragornPosition = (position: any) => {
  //   setAragornPos(position)
  // }

  // const getOrchunterPosition = (position: any) => {
  //   setOrcHunterPos(position)
  // }

  // const getArcherPosition = (position: any) => {
  //   setOrcArcherPos(position)
  // }

  // const getNazgulPosition = (position: any) => {
  //   setNazgulPos(position)
  // }

  // const resetDbPosition = () => {
  //   setDBPosition({x: null, y: null})

  // }


  return (
    <div className="hiddenOverflow ">
      <div className='leftColumn flex'>
        {/* <Chat channelName="ably-chat-room"/> */}
        <div className='trackerStyle'>
        </div>
      </div>
      <div className='rightColumn flex'>
        <Map />
        {showAragorn ? 
          <Aragorn channelName="ably-chat-room" dBPosition={dBPosition} />
        :
          null
        }
        {/* <OrcArcher /> */}
        {/* <OrcHunter />
        <Nazgul /> */}
      </div>
    </div>
  );
};

export default ZoomableImage;
