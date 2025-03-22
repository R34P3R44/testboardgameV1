"use client";
import React, { useEffect } from 'react';
import FactionsAccordion from './FactionsAccordion'
import { useSelectedCharacterHook } from '../../_hooks/useSelectedCharacterHook';

interface FactionsProps {
  onCloseModal(): void
  activeItem: string | null
}

const Factions: React.FC<FactionsProps> = ({ onCloseModal, activeItem }) => {

  const { isCharacterSelected } = useSelectedCharacterHook();

  useEffect(() => {
    if (isCharacterSelected) {
      onCloseModal()
    }
  }, [isCharacterSelected]);

  return (
      <div
        data-dialog-backdrop="dialog xxl"
        data-dialog-backdrop-close="true"
        className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-red-500 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
        <div className="h-screen rounded-lg bg-gray-200 shadow-lg w-full max-w-7xl">
          <div className="flex justify-between items-center p-2">
            <div className="text-xl font-medium text-slate-800">{activeItem}</div>
            <button className="hover:scale-110 hover:text-black transform transition-all flex w-10 h-10 bg-gray-200 justify-center items-center text-2xl font-extrabold rounded-full cursor-pointer" 
                    data-dialog-close="true" 
                    type="button" 
                    onClick={onCloseModal}>X
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



{/* <dialog open className="modal rounded-md">
<div className="bg-gray-900 w-4/6 h-5/6 rounded-md">
  <div className="flex justify-between pl-4 pt-2 pb-2">
    <h2 className="font-bold text-2xl text-yellow-500">Inventory</h2>
    <button
      className="text-yellow-500 hover:text-3xl hover:text-gray-300 transform transition-all flex w-10 h-10 bg-transparent justify-center items-center text-2xl font-extrabold cursor-pointer mr-1"
      type="button"
    >
      X
    </button>
  </div>

  <div className="w-auto h-full bg-gray-100 p-5">
    <FactionsAccordion />
  </div>
  <div className="flex justify-end pr-4 pt-2 pb-2"></div>
</div>
</dialog> */}