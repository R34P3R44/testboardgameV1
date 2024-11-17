"use client";
import React, { useState, useEffect } from 'react';
import Map from '../Map';
import Factions from '../Factions';

interface MaincontentProps {
    activeItem: string | null;
    onCloseModal: () => void;
    isActiveModal: boolean;
}

const Maincontent: React.FC<MaincontentProps> = ({ activeItem, onCloseModal, isActiveModal}) => { 

  return (
    <div>
        <Map/>
        {isActiveModal && activeItem === 'Factions' ? 
            <Factions onCloseModal={onCloseModal} activeItem={activeItem}/>
            :
            null
        }
    </div>
  )
};

export default Maincontent;
