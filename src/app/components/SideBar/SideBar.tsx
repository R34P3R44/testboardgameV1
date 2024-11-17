"use client";

import React from 'react';

interface SideBarProps {
    onOpenModal: (faction: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({onOpenModal}) => {

    const sidebarList = ['Map', 'Rules', 'Factions', 'Players', 'Battlegrounds', 'World']


    return (
        <div className="relative group w-10 flex flex-col z-50 duration-700 cursor-pointer h-full rounded-r-full bg-yellow-600 hover:rounded-none hover:mx-0 hover:w-1/6 hover:h-screen hover:bg-gray-800 ease-linear">
            <div className="absolute top-0 left-0 w-full h-full hidden group-hover:block bg-gray-900 p-4 text-white ease-linear duration-700">                
                <ul className="menu">
                    {sidebarList.map((listItem) => (
                        <li 
                            key={listItem}
                            onClick={() => onOpenModal(listItem)}
                            // className={activeItem ? }
                        >
                            <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                                <span className="icon-[tabler--home] size-15"></span>
                                {listItem}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='fixed bottom-5'>
                    © 2024 All rights reserved.
                </div>
            </div>
        </div>
    )
};

export default SideBar;
