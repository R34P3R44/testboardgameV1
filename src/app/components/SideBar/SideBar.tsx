"use client";

import React, { useState, useEffect } from 'react';

interface SideBarProps {
    handleItemClick?: (faction: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ handleItemClick }) => {

    const sidebarList = ['Map', 'World', 'Players', 'Factions', 'Rules', 'Main menu']

    return (
        <React.Fragment>
                <div className="fixed group w-10 flex flex-col z-50 duration-200 cursor-pointer h-full rounded-r-full bg-yellow-600 hover:rounded-none hover:mx-0 hover:w-1/6 hover:h-screen hover:bg-gray-800 ease-linear">
                    <div className="absolute top-0 left-0 w-full h-full hidden group-hover:block bg-gray-900 p-4 text-white ease-linear duration-200">
                        <ul className="menu">
                            {sidebarList.map((listItem) => (
                                <li
                                    key={listItem}
                                    onClick={() => handleItemClick && handleItemClick(listItem)}
                                >
                                    <a href={`#${listItem}`} className="h-16 w-40 flex items-center text-xl hover:bg-gray-900 hover:border-l-4 hover:border-red-900 hover:border-r-4">
                                        {listItem}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

        </React.Fragment>

    )
};

export default SideBar;


