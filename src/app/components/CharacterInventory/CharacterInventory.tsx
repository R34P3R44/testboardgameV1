"use client";
import React, { useEffect, useState } from 'react';
import { getCharacterInventory } from '@/app/_restApiFn/getCharacterInventory';
// import { updateCharacterInventory } from '@/app/_restApiFn/send-updateCharacterInventory';
import { CharacterPosition, ItemAttributes } from '../../data-types/characterType';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
import Spinner from '../Misc/Spinner';
import { SuccesAlert, FailAlert } from '../Misc/Alert';
import InventoryTable from './InventoryTable';

interface CharacterSheetProps {
  setShowInventory?: (value: boolean) => void;
  dBPositions?: CharacterPosition[];
}

const CharacterInventory: React.FC<CharacterSheetProps> = ({ setShowInventory, dBPositions }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState({ success: false, fail: false });
  const [inventoryItems, setInventoryItems] = useState<ItemAttributes[] | null>(null)
  const { characterInventory } = useCharacterInventory();

  useEffect(() => {
    setInventoryItems(characterInventory);
  }, []);

  return (
    <>
      {alert.success || alert.fail ? (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {alert.success && <SuccesAlert alert={alert} />}
          {alert.fail && <FailAlert alert={alert} />}
        </div>
      ) : null}
            
      <dialog open className="modal rounded-md">
        <div className="bg-gray-200 rounded-md w-4/6 h-5/6">
          <div className="flex justify-between pl-4 pt-2 pb-2">
            <h2 className="font-bold text-2xl">Inventory</h2>
            <button
              className="hover:text-3xl hover:text-black transform transition-all flex w-10 h-10 bg-transparent justify-center items-center text-2xl font-extrabold cursor-pointer mr-1"
              type="button"
              onClick={() => setShowInventory && setShowInventory(false)}
            >
              X
            </button>
          </div>

          <div className="w-auto h-full bg-gray-100 rounded-md p-5">
              <InventoryTable inventoryItems={inventoryItems}/>
          </div>
          <div className="flex justify-end pr-4 pt-2 pb-2"></div>
        </div>
      </dialog>

    </>
  );
};

export default CharacterInventory;
