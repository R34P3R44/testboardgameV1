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
    <React.Fragment>
      {!showGameMenu && 
        <MapContainer activeMenuItem={activeMenuItem}/>
      }
      {isActiveModal && activeItem === 'Factions' ?
        <Factions onCloseModal={onCloseModal} activeItem={activeItem} />
        :
        null
      }
    </React.Fragment>
  )
};

export default Maincontent;
