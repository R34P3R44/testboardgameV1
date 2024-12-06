"use client";

import React from 'react';
import { updateCharacters } from '../../pages/_restApiFn/send-updateCharacters'


interface MoverangePropps {
    moveRangePosition : {
        x: number | null,
        y: number | null
    }
}

const Moverange: React.FC<MoverangePropps> = ({moveRangePosition}) => { 
    
    const charId = "RoadKill1"
    const active = false

  const removeCharacter = async () => {
    await updateCharacters(charId, active)

  }

  return (
    <div className='block z-40'>
      <ul className=' z-40'>
        <li>
          <button className='w-36 h-7 bg-blue-700 text-yellow-500 rounded-lg font-bold m-1'>Profile</button>
        </li>
        <li>
          <button onClick={removeCharacter} className='w-36 h-7 bg-blue-700 text-yellow-500 rounded-lg font-bold m-1 curzor-pointer'>Remove</button>
        </li>
      </ul>
    </div>
  )
};

export default Moverange;