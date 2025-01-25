"use client"

import React, { useState, useEffect } from 'react';
import Spinner from '../Misc/Spinner';
import './GameMenu.css';

interface GameMenuProps {
    onOpenGameMenu: (gameMenuItem: string) => void
}

const GameMenu: React.FC<GameMenuProps> = ({onOpenGameMenu}) => {
    
    const [loading, setLoading] = useState(false)

    const gameMenuList = ['New game', 'Load game', 'Rules',]


    return (
        <React.Fragment>
            
            {loading && 
                <div className='flex items-center justify-center h-screen'>
                    <Spinner/>
                </div>
            }
            <div className={"gameMenuBackground"}> 
                <div className="w-72 h-full group-hover:block bg-gray-900 p-4 text-white ease-linear duration-200 fixed right-0">
                    <ul className="menu">
                        {gameMenuList.map((gameMenuListItem) => (
                            <li
                                key={gameMenuListItem}
                                onClick={() => onOpenGameMenu(gameMenuListItem)}
                            >
                                <a href={`#${gameMenuListItem}`} className="h-16 flex items-center text-xl hover:bg-gray-900 hover:border-l-4 hover:border-red-900 hover:border-r-4">
                                    {gameMenuListItem} 
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='fixed bottom-5 pl-10'>
                        © 2024 All rights reserved.
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default GameMenu;



