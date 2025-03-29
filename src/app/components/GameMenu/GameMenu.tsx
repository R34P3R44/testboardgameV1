"use client"

import React, { useState, useEffect } from 'react';
import Spinner from '../Misc/Spinner';
import './GameMenu.css';
import { gameMenuList } from '@/app/data-types/constants';
import {useGameMenuNavigation} from '../../Store/useGameMenuNavigation'


const GameMenu: React.FC = () => {
    
    const [loading, setLoading] = useState(false)
    const {activeGameMenuItem, setActiveGameMenuItem} = useGameMenuNavigation()

    const onOpenGameMenu = (gameMenuListItem: string) => {
        switch (gameMenuListItem) {
            case "New game":
                setActiveGameMenuItem("New game")
              break;
            case "Load game":
                setActiveGameMenuItem("Load game")
              break;
            case "Rules":
                setActiveGameMenuItem("")
              break;
            default:
              return ""
          }
    }

    return (
        <React.Fragment>
            
            {loading && 
                <div className='flex items-center justify-center h-screen'>
                    <Spinner/>
                </div>
            }
                <div className="w-full h-full group-hover:block bg-gray-900 p-4 text-white ease-linear duration-200 fixed right-0 sm:w-48 md:w-48 lg:w-52 xl:w-[208px]">
                    <ul className="menu">
                        {gameMenuList.map((gameMenuListItem) => (
                            <li
                                key={gameMenuListItem}
                                onClick={() => onOpenGameMenu(gameMenuListItem)}
                            >
                                <a href={`#${gameMenuListItem}`}  className={gameMenuListItem === "Rules" ? "opacity-60 h-16 flex items-center text-xl" :"h-16 flex items-center text-xl hover:bg-gray-900 hover:border-l-4 hover:border-red-900 hover:border-r-4"}>
                                    {gameMenuListItem} 
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='fixed bottom-5 text-sm '>
                        © 2024 All rights reserved.
                    </div>
                </div>
                <div className={"gameMenuBackground"}></div>

        </React.Fragment>
    )
}

export default GameMenu;



