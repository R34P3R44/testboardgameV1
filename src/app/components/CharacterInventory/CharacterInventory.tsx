
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { updateCharacterInventory } from '@/app/_restApiFn/send-updateCharacterInventory';
import { getCharacterInventory } from '@/app/_restApiFn/getCharacterInventory';
import { INCREMENT, DECREMENT } from '../../data-types/constants'
import { CharacterPosition } from "../../data-types/characterType";
import { InventoryAttributes } from '../../data-types/characterType';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
import { getCharacterAttributes } from '@/app/_restApiFn/getCharacterAttributes';
import { ItemAttributes } from '../../data-types/characterType';
import Spinner from '../Misc/Spinner';
import { SuccesAlert, FailAlert } from '../Misc/Alert';
import { AlertTypes } from '../../data-types/characterType';
import InventoryTable from './InventoryTable';


interface CharacterSheetProps {
  setShowInventory: (value: boolean) => void;
  dBPositions: CharacterPosition[];
//   isCharSheetShown: boolean
}

const CharacterInventory: React.FC<CharacterSheetProps> = ({setShowInventory, dBPositions}) => {

      const [inventory, setInventory] = useState<InventoryAttributes | null>(null)
      const [loading, setLoading] = useState<boolean>(false)
      const { characterInventory, setCharacterInventory } = useCharacterInventory()
      const [alert, setAlert] = useState<AlertTypes>({ success: false, fail: false })
      const [inventoryItems, setInventoryItems] = useState<InventoryAttributes | null>(null)


      useEffect(() => {
        const getCharAttr = async () => {
          setLoading(true)
          if ((!characterInventory || Object.keys(characterInventory).length === 0)) {
            try {
              const data: InventoryAttributes = await getCharacterInventory(dBPositions[0].charId)
              setCharacterInventory(data)
            }
            catch (error) {
              console.log(error, "Error fetching character attributes")
            }
          }
        };
        getCharAttr()
      }, []);

      useEffect(() => {
        if (characterInventory && Object.keys(characterInventory).length > 0) {
            setInventoryItems(characterInventory)
          setLoading(false)
        }
      }, [characterInventory]);

    //   const removeItem = (id: number) => {
        
    //   };


      const saveInventory = async () => {
        setLoading(true)

        let updatedInv: ItemAttributes | null = null;

        if (characterInventory) {
          updatedInv = {
            itemData: {
                id: characterInventory.itemData.id,
                visible: characterInventory.itemData.visible,
                type: characterInventory.itemData.type,
                item: characterInventory.itemData.item,
                description: characterInventory.itemData.description,
                weight: characterInventory.itemData.weight,
                qty: characterInventory.itemData.qty,
                isJunk: characterInventory.itemData.isJunk,
                positionX: characterInventory.itemData.positionX,
                positionY: characterInventory.itemData.positionY,
            },
            charId: characterInventory.charId
          }
          setCharacterInventory(updatedInv)
        }
        if(updatedInv) {
        try {
                const response = await updateCharacterInventory(dBPositions[0].charId, updatedInv)
                if (response.success) {
                    setAlert({ success: true, fail: false })
                }
                else {
                    setAlert({ success: false, fail: true })
                }
            }
            catch (error) {
                console.error("Error updating character inventory:", error);
              }
        }
        else {
            console.error("Character inventory is not available.");
        }

        setTimeout(() => setAlert({ success: false, fail: false }), 3000)
        setLoading(false)
      }

    return (
        <>
            <>
                {(alert.success || alert.fail) && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-top">
            {alert.success && !alert.fail && <SuccesAlert alert={alert} />}
            {alert.fail && !alert.success && <FailAlert alert={alert} />}
          </div>
        )}

            </>
            <>
                {/* {(loading || !characterAttributes || !isCharSheetShown) ? */}
                <dialog open className="modal rounded-md">
                    <div className='flex items-center justify-center h-screen'>
                        <Spinner />
                    </div>
                </dialog>
                :
                <dialog open className="modal rounded-md">
                    <div className="bg-gray-200 rounded-md w-4/6 h-5/6">
                        <div className='flex justify-between pl-4 pt-2 pb-2'>
                            <h2 className="font-bold text-2xl">{`Inventory`}</h2>
                            <button
                                className="hover:text-3xl hover:text-black transform transition-all flex w-10 h-10 bg-transparent justify-center items-center text-2xl font-extrabold cursor-pointer mr-1"
                                data-dialog-close="true"
                                type="button"
                            onClick={() => setShowInventory(false)}
                            >X
                            </button>
                        </div>

                        <div className="w-auto h-auto min-h-96 min-w-96 bg-gray-100 rounded-md m-5">
                            <div className="overflow-x-auto">
                                <InventoryTable
                                    inventory={inventory}
                                />
                            </div>
                        </div>

                        <div className='flex justify-end pr-4 pt-2 pb-2'>
                            <button onClick={() => saveInventory()} className="btn btn-outline font-bold text-md text-yellow-500 bg-gray-900">Save</button>
                        </div>
                    </div>
                </dialog>
                {/* } */}
            </>
        </>
    );
};

export default CharacterInventory;
