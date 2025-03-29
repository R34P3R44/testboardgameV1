"use client";
import React, { useEffect } from 'react';
import FactionsAccordion from './FactionsAccordion'
import { useSelectedCharacterHook } from '../../_hooks/useSelectedCharacterHook';
import { useSideMenuNavigation } from '@/app/Store/useSideMenuNavigation';

const Factions: React.FC = () => {

  const { isCharacterSelected } = useSelectedCharacterHook();
  const {activeSideMenuItem, setActiveSideMenuItem} = useSideMenuNavigation()


  // useEffect(() => {
  //   if (isCharacterSelected) {
  //     onCloseModal()
  //   }
  // }, [isCharacterSelected]);

  return (
      <div
        data-dialog-backdrop="dialog xxl"
        data-dialog-backdrop-close="true"
        className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
        <div className="h-screen rounded-lg bg-gray-200 shadow-lg w-full max-w-7xl">
          <div className="flex justify-between items-center p-2">
            <div className="text-xl font-medium text-slate-800">{activeSideMenuItem}</div>
            <button 
              className="hover:scale-110 hover:text-black transform transition-all flex w-10 h-10 bg-gray-200 justify-center items-center text-2xl font-extrabold rounded-full cursor-pointer" 
              data-dialog-close="true" 
              type="button" 
              onClick={() => setActiveSideMenuItem('')}
            >
            X
            </button>
          </div>
          <div className="p-4 h-full flex flex-col">
            <div className="flex flex-col border bg-gray-200 w-full h-full">
              <div className="px-4 py-5 flex-1 overflow-auto">
                <ul className="space-y-1 pb-10">
                  <FactionsAccordion />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Factions;