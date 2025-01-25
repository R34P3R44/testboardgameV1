"use client";

import React from 'react';
import { updateCharacters } from '../../_restApiFn/send-updateCharacters'
import { CharacterPosition } from "../../data-types/characterType";
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';


interface ContextMenuProps {
  dBPositions: CharacterPosition[];
  closeContextMenu(): void
}

const ContextMenu: React.FC<ContextMenuProps> = ({ dBPositions, closeContextMenu }) => {

  const { setCharacterSelected } = useSelectedCharacter();

  const removeCharacter = async () => {
    await updateCharacters(dBPositions[0].charId, false)
    setCharacterSelected(true)
  }

  return (
    <div className='w-44 block z-40 relative left-12 bg-gray-900 rounded'>
      <div className='flex justify-end font-extrabold'>
        <button onClick={closeContextMenu} className='text-yellow-500 pt-1 pe-2 hover:text-yellow-100'>X</button>
      </div>
      <ul className='flex-col justify-items-center z-40 p-2'>
        <li>
          <button className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1'>Profile</button>
        </li>
        <li>
          <button onClick={removeCharacter} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer'>Remove</button>
        </li>
      </ul>
    </div>
  )
};

export default ContextMenu;