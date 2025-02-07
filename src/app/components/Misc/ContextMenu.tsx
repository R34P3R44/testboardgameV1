"use client";

import React, {useState} from 'react';
import { updateCharacters } from '../../_restApiFn/send-updateCharacters'
import { CharacterPosition } from "../../data-types/characterType";
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';
import { GiPadlock } from "react-icons/gi";
import { GiPadlockOpen } from "react-icons/gi";
import { useNavigation } from '../../Store/useNavigation';
import CharacterSheet from '../CharacterSheet/CharatcerSheet';


interface ContextMenuProps {
  dBPositions: CharacterPosition[];
  closeContextMenu(): void;
  onClickMove(): void;
  onClickLock(): void;
  enableMoving: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ dBPositions, closeContextMenu, onClickMove, enableMoving, onClickLock }) => {

  const { setIsCharacterSelected } = useSelectedCharacter();
  const { isCharSheetShown, setIsCharSheetShown } = useNavigation();


  const removeCharacter = async () => {
    await updateCharacters(dBPositions[0].charId, false)
    setIsCharacterSelected(true)
  }

  const onMoveClick = () => {
    onClickMove()
  }

  const onLockClick = () => {
    onClickLock()
  }

  return (
    <div className='w-44 block z-40 relative left-12 bg-gray-900 rounded-lg'>
      <div className='flex justify-between font-extrabold'>
          {enableMoving ? <GiPadlockOpen className='pt-1 ps-2' color='#48bb78' size={30} /> : <GiPadlock className='pt-1 ps-2' color='#f56565' size={30}/>}
        <button onClick={closeContextMenu} className='text-yellow-500 pt-1 pe-2 hover:text-yellow-100'>X</button>
      </div>
      <ul className='flex-col justify-items-center z-40 p-2'>
        <li>
          <button onClick={() => setIsCharSheetShown(true)} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 hover:text-yellow-100'>Character Sheet</button>
        </li>
        <li>
          <button onClick={onMoveClick} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Move</button>
        </li>
        <li>
          <button onClick={onLockClick} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Lock</button>
        </li>
        <li>
          <button onClick={removeCharacter} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Remove</button>
        </li>
      </ul>
      {isCharSheetShown && 
      <CharacterSheet setIsCharSheetShown={setIsCharSheetShown} dBPositions={dBPositions} isCharSheetShown={isCharSheetShown}/>
      }

    </div>

  )
};

export default ContextMenu;