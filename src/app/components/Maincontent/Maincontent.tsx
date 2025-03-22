"use client";
import React from 'react';
import Factions from '../SideBar/Factions';
import MapContainer from '../Map/MapContainer';

interface MaincontentProps {
  activeItem: string | null;
  onCloseModal: () => void;
  isActiveModal: boolean;
  showGameMenu: boolean;
  activeMenuItem: string | null
}

const Maincontent: React.FC<MaincontentProps> = ({ activeItem, onCloseModal, isActiveModal, showGameMenu, activeMenuItem }) => {
  
  return (
    <>
      {!showGameMenu && 
        <MapContainer activeMenuItem={activeMenuItem}/>
      }
      {isActiveModal && activeItem === '4' ?
        <Factions onCloseModal={onCloseModal} activeItem={activeItem} />
        :
        null
      }
    </>
  )
};

export default Maincontent;
