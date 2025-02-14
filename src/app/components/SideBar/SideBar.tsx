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
        { key: 2, value: GiEarthAfricaEurope, tooltip: 'World' },
        { key: 3, value: IoPeopleSharp, tooltip: 'Players' },
        { key: 4, value: GiCrenulatedShield, tooltip: 'Factions' },
        { key: 5, value: GiBookmarklet, tooltip: 'Rules' },
        { key: 6, value: TiThMenu, tooltip: 'Main menu' }
    ]

    return (
        <React.Fragment>
            {/* <div className="fixed w-10 flex flex-col z-50 cursor-pointer h-full bg-yellow-600 "> */}
            <div className="sm:w-9 md:w-10 lg:w-12 xl:w-auto p-1 absolute top-0 left-0 w-auto h-full group-hover:block bg-gray-900 text-white ease-linear duration-200">
                <ul className="menu p-0 sm:h-64 md:h-72 md:w-16 lg:h-96 lg:w-16 xl:h-screen xl:w-16 ">
                    {sidebarList.map((listItem) => (
                        <li
                            key={listItem.key}
                            onClick={() => handleItemClick && handleItemClick(String(listItem.key))}
                            className='sm:h-7 sm:w-16 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16'
                        >
                            <div className="tooltip tooltip-right p-2" data-tip={listItem.tooltip}>
                                <a href={`#${listItem.key}`} className="md:text-lg lg:text-3xl xl:text-5xl h-16 w-12  flex items-center text-yellow-600 hover:text-yellow-200">
                                    {React.createElement(listItem.value)}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* </div> */}

        </React.Fragment>

    )
};

export default SideBar;


