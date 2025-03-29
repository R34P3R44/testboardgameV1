"use client"; // This directive makes the component a client component

import React, { useState, useEffect } from 'react';
import SideBar from './SideBar/SideBar';
import Maincontent from './Maincontent/Maincontent';
import GameMenu from './GameMenu/GameMenu';
import { useGameMenuNavigation } from '../Store/useGameMenuNavigation';


const Main: React.FC = ({ }) => {

  const {activeGameMenuItem} = useGameMenuNavigation()

  return (
    <>
      {activeGameMenuItem === null ?
        <GameMenu/>
      :
        <Maincontent/>
      }
    </>
  );
};

export default Main;
