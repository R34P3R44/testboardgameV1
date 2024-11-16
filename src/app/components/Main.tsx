"use client"; // This directive makes the component a client component

import React, { useState, useEffect } from 'react';
import Aragorn from './characters/aragorn';
import Map from './map';
import Sidebar from './Sidebar';

interface AragornPosition {
  x: number | null;
  y: number | null;
  dateTime: Date | null;
}

const Main: React.FC = ({ }) => {

  const [showAragorn, setShowAragorn] = useState<boolean>(false);

  const [dBPosition, setDBPosition] = useState<AragornPosition>({ x: 0, y: 0, dateTime: new Date() });


  useEffect(() => {
    const fetchposition = async () => {
      const res = await fetch('/api/get-position');
      if (res.ok) {
        const data = await res.json();
        const respData = data.positions
        console.log(respData)
        const latestPlayerMove = Array.isArray(respData) ? [...respData].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
        if (latestPlayerMove === undefined || latestPlayerMove === null) {
          setDBPosition({ x: 0, y: 0, dateTime: new Date() })
          setShowAragorn(true)
        }
        else {
          console.log(latestPlayerMove)
          setDBPosition({ x: latestPlayerMove[0].x, y: latestPlayerMove[0].y, dateTime: latestPlayerMove[0].dateTime })
          setShowAragorn(true)

        }
      }
      else {
        setDBPosition({ x: 0, y: 0, dateTime: new Date() })
        setShowAragorn(true)
      }
    }

    fetchposition()

  }, []);


  return (
    <div className="flex flex-row h-screen">
      <div className="relative  group w-10 flex flex-col z-50 duration-300 cursor-pointer h-full rounded-r-lg bg-yellow-600 hover:rounded-none hover:rounded-r-lg hover:mx-0 hover:w-1/6 hover:h-screen hover:bg-gray-800"> 
          <div className='absolute top-0 left-0 w-full h-full hidden group-hover:block bg-gray-900 p-4 text-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0'>
            <ul className="menu">
              <li>
                <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                  <span className="icon-[tabler--home] size-15"></span>
                  Map
                </a>
              </li>
              <li>
                <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                  <span className="icon-[tabler--user] size-15"></span>
                  World
                </a>
              </li>
              <li>
                <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                  <span className="icon-[tabler--message] size-15"></span>
                  Battlegrounds
                </a>
              </li>
              <li>
                <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                  <span className="icon-[tabler--message] size-15"></span>
                  Players
                </a>
              </li>
              <li className=''>
                <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                  <span className="icon-[tabler--message] size-15"></span>
                  Factions
                </a>
              </li>
              <li>
                <a href="#" className="h-16 flex items-center text-xl hover:bg-red-900">
                  <span className="icon-[tabler--message] size-15"></span>
                  Rules
                </a>
              </li>
            </ul>
            <div className='fixed bottom-5'>
              © 2024 All rights reserved.    
            </div>
          </div>
      </div>
      <Map />
      {showAragorn ? (
        <Aragorn dBPosition={dBPosition} />
      ) : null}
    </div>
  );
};

export default Main;
