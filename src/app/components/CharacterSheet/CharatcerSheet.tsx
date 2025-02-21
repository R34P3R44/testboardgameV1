
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { updateCharacterWounds } from '@/app/_restApiFn/send-updateCharacterWounds';
import { INCREMENT, DECREMENT } from '../../data-types/constants'
import { CharacterPosition } from "../../data-types/characterType";
import { useCharacterAttributes } from '@/app/Store/useCharacterAttributes';
import { getCharacterAttributes } from '@/app/_restApiFn/getCharacterAttributes';
import { CharacterAttributes } from '../../data-types/characterType';
import Spinner from '../Misc/Spinner';
import { GiSpinningSword } from "react-icons/gi";
import { GiSlashedShield } from "react-icons/gi";
import { GiWalk } from "react-icons/gi";
import { GiRaggedWound } from "react-icons/gi";
import { SuccesAlert, FailAlert } from '../Misc/Alert';
import { AlertTypes } from '../../data-types/characterType';


interface CharacterSheetProps {
  setIsCharSheetShown: (value: boolean) => void;
  dBPositions?: CharacterPosition[];
  isCharSheetShown: boolean
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ setIsCharSheetShown, dBPositions, isCharSheetShown }) => {

  const [wounds, setWounds] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { characterAttributes, setCharacterAttributes } = useCharacterAttributes();
  const [alert, setAlert] = useState<AlertTypes>({ success: false, fail: false })


  useEffect(() => {
    const getCharAttr = async () => {
      setLoading(true)
      if (dBPositions && (!characterAttributes || Object.keys(characterAttributes).length === 0)) {
        try {
          const data: CharacterAttributes = await getCharacterAttributes(dBPositions[0].charId)
          setCharacterAttributes(data)
        }
        catch (error) {
          console.log(error, "Error fetching character attributes")
        }
      }
    };
    getCharAttr()
  }, []);

  useEffect(() => {
    if (characterAttributes && Object.keys(characterAttributes).length > 0) {
      setWounds(characterAttributes.wounds)
      setLoading(false)
    }
  }, [characterAttributes]);

  const updateWounds = (change: number) => {
    const newWounds = wounds + change;
    setWounds(newWounds);
  };


  const saveAttributes = async () => {
    setLoading(true)
    if (characterAttributes) {
      const updatedAttr: CharacterAttributes = {
        charId: characterAttributes.charId,
        move: characterAttributes.move,
        attack: characterAttributes.attack,
        defend: characterAttributes.defend,
        wounds: wounds
      }
      setCharacterAttributes(updatedAttr)
    }
    if(dBPositions) {
      try {
        const response = await updateCharacterWounds(dBPositions[0].charId, wounds)
        if (response.success) {
          setAlert({ success: true, fail: false })
        }
        else {
          setAlert({ success: false, fail: true })
        }
      }
      catch (error) {
        console.error("Error updating character wounds:", error);
      }  
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
        {(loading || !characterAttributes || !isCharSheetShown) ?
          <dialog open className="modal rounded-md">
            <div className='flex items-center justify-center h-screen'>
              <Spinner />
            </div>
          </dialog>
          :
          <dialog open className="modal rounded-md">
            <div className="bg-gray-200 rounded-md w-5/12 min-w-40">
              <div className='flex justify-between pl-4 pt-2 pb-2'>
                <h2 className="font-bold text-2xl">{`${dBPositions && dBPositions[0].charId}`}</h2>
                <button className="hover:text-3xl hover:text-black transform transition-all flex w-10 h-10 bg-transparent justify-center items-center text-2xl font-extrabold cursor-pointer mr-1" data-dialog-close="true" type="button" onClick={() => setIsCharSheetShown(false)}>X</button>
              </div>
              <div className="flex justify-evenly bg-gray-100 ml-4 mr-4 rounded-md">
                <div className='h-72 w-72 flex'>
                  <Image
                    alt={""}
                    width={300}
                    height={450}
                    src={"/Deep_Goblin_Spear_large.webp"}
                    className="rounded-lg" />
                </div>
                <div className='h-72 w-72 flex flex-col justify-evenly'>
                  <div className='flex flex-row items-center border-b-2'>
                    <div className="lg:tooltip flex flex-row mr-2" data-tip="Move">
                      <GiWalk className='mr-4' size={40} />
                    </div>
                    <div>
                      {`${characterAttributes.move}`}
                    </div>
                  </div>
                  <div className='flex flex-row items-center border-b-2'>
                    <div className="lg:tooltip flex flex-row mr-2" data-tip="Attack">
                      <GiSpinningSword className='mr-4' size={40} />
                    </div>
                    <div>
                      {`${characterAttributes.attack}`}
                    </div>
                  </div>
                  <div className='flex flex-row items-center border-b-2'>
                    <div className="lg:tooltip flex flex-row mr-2" data-tip="Defend">
                      <GiSlashedShield className='mr-4' size={40} />
                    </div>
                    <div>
                      {`${characterAttributes.defend}`}
                    </div>
                  </div>

                  <div className='flex flex-row w-auto justify-between items-center border-b-2'>
                    <div className='flex flex-row items-center pr-5'>
                      <div className="lg:tooltip flex flex-row mr-2" data-tip="Wounds">
                        <GiRaggedWound className='mr-4' size={40} />
                      </div>
                      <div>
                        {`${wounds}`}</div>
                    </div>
                    <div className='flex justify-evenly w-40 min-w-28'>
                      <button onClick={() => updateWounds(INCREMENT)} className="btn btn-outline font-bold text-1xl btn-sm text-yellow-500 bg-gray-900 mr-2">+</button>
                      <button onClick={() => updateWounds(DECREMENT)} className="btn btn-outline font-bold text-1xl btn-sm text-yellow-500 bg-gray-900">−</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end pr-4 pt-2 pb-2'>
                <button onClick={saveAttributes} className="btn btn-outline font-bold text-md text-yellow-500 bg-gray-900">Save</button>
              </div>
            </div>
          </dialog>}
      </>
    </>
  );
};

export default CharacterSheet;
