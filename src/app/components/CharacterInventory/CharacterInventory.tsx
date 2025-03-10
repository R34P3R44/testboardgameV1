"use client";
import React, { useEffect, useState } from 'react';
import { getCharacterInventory } from '@/app/_restApiFn/getCharacterInventory';
// import { updateCharacterInventory } from '@/app/_restApiFn/send-updateCharacterInventory';
import { CharacterPosition, ItemAttributes, EnemyPosition } from '../../data-types/characterType';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
// import Spinner from '../Misc/Spinner';
import { SuccesAlert, FailAlert } from '../Misc/Alert';
import InventoryTable from './InventoryTable';
import { useMapItems } from '@/app/Store/useMapItems';


interface CharacterSheetProps {
  setShowInventory?: (value: boolean) => void;
  dBPositions: CharacterPosition[];
  enemyPositions: EnemyPosition[]
}

const CharacterInventory: React.FC<CharacterSheetProps> = ({ setShowInventory, dBPositions }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState({ success: false, fail: false });
  const [inventoryItems, setInventoryItems] = useState<ItemAttributes[]>([])
  const { characterInventory, setCharacterInventory } = useCharacterInventory();
  const { mapItems, setMapItems } = useMapItems();


  useEffect(() => {
    let allInventoryItems: ItemAttributes[];
    let data: ItemAttributes[];
    if (!characterInventory.length) {
      const fetchInventory = async () => {
        if (dBPositions[0]) {
          try {
            data = await getCharacterInventory(dBPositions[0].charId);
            allInventoryItems = [...data, ...characterInventory]
            setCharacterInventory(allInventoryItems);
          } catch (error) {
            console.error("Error fetching character inventory:", error);
          }
        }
      };
      fetchInventory();
    }
    else {
      setCharacterInventory(characterInventory);
    }
  }, []);

  const onRemoveItem = (item: ItemAttributes) => {
    if (!item) setAlert({ success: false, fail: true });

    else {
      const itemToRemove = characterInventory.find((i) => i.id === item.id);
      const remainingItems = characterInventory.filter((i) => i.id !== item.id);

      const randomXPosition = Math.floor(Math.random() * 50) + 20;
      const randomYPosition = Math.floor(Math.random() * 40) + 20;

      const newRItemRandomPositionX = randomXPosition + (dBPositions ? dBPositions[0].latestPositions.x : 0);
      const newRItemRandomPositionY = randomYPosition + (dBPositions ? dBPositions[0].latestPositions.y : 0)


      if (!itemToRemove) return;
      if (dBPositions) {
        const droppedItem: ItemAttributes = {
          id: itemToRemove.id,
          charId: '',
          itemData: {
            visible: true,
            type: itemToRemove.itemData.type,
            item: itemToRemove.itemData.item,
            description: itemToRemove.itemData.description,
            weight: itemToRemove.itemData.weight,
            qty: itemToRemove.itemData.qty,
            isJunk: itemToRemove.itemData.isJunk,
            positionX: newRItemRandomPositionX,
            positionY: newRItemRandomPositionY,
          }
        }

        setMapItems([...mapItems, droppedItem])
        setCharacterInventory(remainingItems)
        setAlert({ success: true, fail: false })
      }
    }
  }

  return (
    <>
      <>
        {alert.success || alert.fail ? (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            {alert.success && <SuccesAlert alert={alert} />}
            {alert.fail && <FailAlert alert={alert} />}
          </div>
        ) : null}
      </>
      <>
        <dialog open className="modal rounded-md">
          <div className="bg-gray-900 w-4/6 h-5/6 rounded-md">
            <div className="flex justify-between pl-4 pt-2 pb-2">
              <h2 className="font-bold text-2xl text-yellow-500">Inventory</h2>
              <button
                className="text-yellow-500 hover:text-3xl hover:text-gray-300 transform transition-all flex w-10 h-10 bg-transparent justify-center items-center text-2xl font-extrabold cursor-pointer mr-1"
                type="button"
                onClick={() => setShowInventory && setShowInventory(false)}
              >
                X
              </button>
            </div>

            <div className="w-auto h-full bg-gray-100 p-5">
              <InventoryTable inventoryItems={inventoryItems} onRemoveItem={onRemoveItem} />
            </div>
            <div className="flex justify-end pr-4 pt-2 pb-2"></div>
          </div>
        </dialog>
      </>
    </>
  );
};

export default CharacterInventory;
