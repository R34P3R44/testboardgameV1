"use client";

import React from 'react';
import { updateCharacters } from '../../pages/_restApiFn/send-updateCharacters'
import { CharacterPosition } from "../../app/data-types/characterType";
import { useSelectedCharacter } from '@/pages/Store/useSelectedCharacter';


interface MoverangeProps {
  dBPositions: CharacterPosition[]
}

const Moverange: React.FC<MoverangeProps> = ({dBPositions}) => { 

  const {setCharacterSelected} = useSelectedCharacter();
    
  const removeCharacter = async () => {
    await updateCharacters(dBPositions[0].charId, false)
    setCharacterSelected(true)
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