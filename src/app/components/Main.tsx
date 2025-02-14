"use client"; // This directive makes the component a client component

import React, { useState, useEffect } from 'react';
import SideBar from './SideBar/SideBar';
import Maincontent from './Maincontent/Maincontent';
import GameMenu from './GameMenu/GameMenu';


const Main: React.FC = ({ }) => {

  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false)
  const [showGameMenu, setShowGameMenu] = useState(true)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)

  const handleItemClick = (listItem: string) => {
    if(listItem === "6"){
      setActiveMenuItem(null)
      setActiveItem(listItem)
      setShowGameMenu(true)
    }
    else if(listItem !== "6"){
        onOpenModal(listItem)
    }  
  }

  const onOpenModal = (listItem: string) => {
    //WIP: expand this function to cater for other sidebar menu items
    setIsActiveModal(true)
    setActiveItem(listItem)
  }

  const onCloseModal = () => {
    setActiveItem(null)
    setIsActiveModal(false)
  }

  const onOpenGameMenu = (gameMenuListItem: string) => {
    setShowGameMenu(false)
    setActiveMenuItem(gameMenuListItem);
  }

  return (
    <div className="flex h-screen w-screen">
      {showGameMenu && 
        <GameMenu 
          onOpenGameMenu={onOpenGameMenu} 
        />
      }
      {(activeMenuItem === 'Load game' || activeMenuItem === 'New game') &&
        <React.Fragment>
          <Maincontent
            showGameMenu={showGameMenu}
            activeItem={activeItem} 
            onCloseModal={onCloseModal}
            isActiveModal={isActiveModal}
            activeMenuItem={activeMenuItem}
          />
          <SideBar 
            handleItemClick={handleItemClick} 
          />
        </React.Fragment>
      }
    </div>
  );
};

export default Main;
