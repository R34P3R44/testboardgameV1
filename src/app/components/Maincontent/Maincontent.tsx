"use client";
import React from 'react';
import Factions from '../SideBar/Factions';
import MapContainer from '../Map/MapContainer';
import { useSideMenuNavigation } from '@/app/Store/useSideMenuNavigation';


const Maincontent: React.FC = () => {

  const {activeSideMenuItem} = useSideMenuNavigation()

  return (
    <>
      {/* {!showGameMenu &&  */}
        <MapContainer/>
      {/* } */}
      { activeSideMenuItem === 'Factions' ?
        <Factions />
        :
        null
      }
    </>
  )
};

export default Maincontent;
