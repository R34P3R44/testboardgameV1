"use client";

import React, { useState, useEffect } from 'react';
import { GiCrenulatedShield } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { GiBookmarklet } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";
import { GiTreasureMap } from "react-icons/gi";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { SideMenuItems } from '@/app/data-types/characterType';

interface SideBarProps {
    handleItemClick?: (listItem: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ handleItemClick }) => {

    const sidebarList = [
        { key: 1, value: GiTreasureMap, tooltip: 'Map'},
        { key: 2, value: GiEarthAfricaEurope, tooltip: 'World'},
        { key: 3, value: IoPeopleSharp, tooltip: 'Players'},
        { key: 4, value: GiCrenulatedShield, tooltip: 'Factions'},
        { key: 5, value: GiBookmarklet, tooltip: 'Rules'},
        { key: 6, value: TiThMenu, tooltip: 'Main menu'}
    ]

    return (
        <React.Fragment>
            <div className="absolute z-50 h-auto p-1 bg-gray-900 rounded-xl top-1 left-3 group-hover:block bg-trasparent text-white ease-linear duration-200">
                <ul className="menu p-0 ">
                    {sidebarList.map((listItem) => (
                        <li
                            key={listItem.key}
                            onClick={() => handleItemClick && handleItemClick(String(listItem.key))}
                            className='h-6 sm:h-7 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 mb-4'
                        >
                            <div className="tooltip tooltip-right p-2" data-tip={listItem.tooltip}>
                                <a href={`#${listItem.key}`} className=" md:text-lg lg:text-3xl xl:text-5xl h-16 w-12 flex items-center text-yellow-600 hover:text-yellow-200">
                                    {React.createElement(listItem.value)} 
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </React.Fragment>

    )
};

export default SideBar;


