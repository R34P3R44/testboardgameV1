"use client";

import React, { useState, useEffect, useRef } from 'react';
import { sidebarList } from '@/app/data-types/constants';
import { useSideMenuNavigation } from '@/app/Store/useSideMenuNavigation';
import { useGameMenuNavigation } from '@/app/Store/useGameMenuNavigation';



const SideBar: React.FC = () => {

    const {setActiveSideMenuItem} = useSideMenuNavigation()
    const {setActiveGameMenuItem} = useGameMenuNavigation()


    const handleItemClick = (listItem: number) => {
        switch (listItem) {
          case 1:
            // code block
            break;
          case 2:
            // code block
            break;
          case 3:
            // code block
            break;
          case 4:
            setActiveSideMenuItem('Factions')
            break;
          case 5:
            // code block
            break;
          case 6:
            setActiveGameMenuItem(null)
            break;
          default:
          // code block
        }
      }

    return (
        <React.Fragment>
            <div className="group-hover:block bg-trasparent text-white ease-linear duration-200 ">
                <ul className="flex flex-col items-center p-0 ">
                    {sidebarList.map((listItem) => (
                        <li
                            key={listItem.key}
                            onClick={() => handleItemClick(listItem.key)}
                            className='h-6 sm:h-7 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 mb-2'
                        >
                            <div className="tooltip tooltip-right p-1" data-tip={listItem.tooltip}>
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


