"use client"; // This directive makes the component a client component

import React, { useState, useEffect } from 'react';
import SideBar from './SideBar/SideBar';
import Maincontent from './Maincontent/Maincontent';

const Main: React.FC = ({ }) => {

  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false)


  const onOpenModal = (listItem: string) => {
    setActiveItem(listItem)
    setIsActiveModal(true)
  }

  const onCloseModal = () => {
    setActiveItem(null)
    setIsActiveModal(false)

  }

  return (
    <div className="flex flex-row h-screen">
      <SideBar onOpenModal={onOpenModal}/>
      <Maincontent 
        activeItem={activeItem} 
        onCloseModal={onCloseModal}
        isActiveModal={isActiveModal}
        />
    </div>
  );
};

export default Main;
