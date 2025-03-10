"use client";

import React, { useState } from 'react';
import { updateCharacters } from '../../_restApiFn/send-updateCharacters'
import { CharacterPosition } from "../../data-types/characterType";
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';
import { GiPadlock } from "react-icons/gi";
import { GiPadlockOpen } from "react-icons/gi";
import { useNavigation } from '../../Store/useNavigation';
import CharacterSheet from '../CharacterSheet/CharatcerSheet';
import CharacterInventory from '../CharacterInventory/CharacterInventory';
import { ContextMenuProps } from '@/app/data-types/contextMenu.types';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';


const ContextMenu: React.FC<ContextMenuProps> = ({
  dBPositions,
  closeContextMenu,
  onClickMove,
  enableMoving,
  onClickLock,
  setShowInventory,
  showInventory,
  contextMenuType,
  onClickPickup,
  currentItem,
  indexId,
  enemyPositions
}) => {

  const { setIsCharacterSelected } = useSelectedCharacter();
  const { isCharSheetShown, setIsCharSheetShown } = useNavigation();

  const removeCharacter = async () => {
    if (dBPositions) {
      await updateCharacters(dBPositions[0].charId, false)
      setIsCharacterSelected(true)
    }
  }

  return (
    <div key={indexId} className={contextMenuType === "Character" || "Enemy" ? 'w-44  z-40 bg-gray-900 rounded-lg relative left-12' : 'w-44  z-40 bg-gray-900 rounded-lg absolute left-12'}>
      <div className='flex justify-between font-extrabold items-center pe-2 ps-2 pt-1'>
        {contextMenuType === "Character" || "Enemy" ?
          <div>
            {enableMoving ? <GiPadlockOpen className='pt-1 ps-2' color='#48bb78' size={30} /> : <GiPadlock className='pt-1 ps-2' color='#f56565' size={30} />}
          </div>
          :
          <div className='text-gray-200'>{currentItem ? `${currentItem.itemData.item}` : ""}</div>
        }
        <button onClick={closeContextMenu} className='text-yellow-500 hover:text-yellow-100'>X</button>
      </div>
      <ul className='flex-col justify-items-center z-40 p-2'>
        {contextMenuType !== "Item" ?
          <>
            <li>
              <button onClick={() => setIsCharSheetShown && setIsCharSheetShown(true)} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 hover:text-yellow-100'>Character Sheet</button>
            </li>
            <li>
              <button onClick={() => onClickMove && onClickMove()} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Move</button>
            </li>
            <li>
              <button onClick={() => removeCharacter} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Remove</button>
            </li>
            <li>
              <button onClick={() => setShowInventory && setShowInventory(true)} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Inventory</button>
            </li>
          </>
          :
          <li>
            <button onClick={() => onClickPickup && onClickPickup(indexId ?? 999)} className='w-36 h-7 bg-blue-400 text-gray-900 rounded-lg font-bold m-1 curzor-pointer hover:text-yellow-100'>Pick up</button>
          </li>
        }
      </ul>

      {isCharSheetShown &&
        <CharacterSheet setIsCharSheetShown={setIsCharSheetShown} dBPositions={dBPositions} isCharSheetShown={isCharSheetShown} enemyPositions={enemyPositions} />
      }
      {showInventory &&
        <CharacterInventory setShowInventory={setShowInventory} dBPositions={dBPositions || []} enemyPositions={enemyPositions || []} />
      }

    </div>

  )
};

export default ContextMenu;