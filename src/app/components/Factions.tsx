"use client";
import React from 'react';
import FactionsAccordion from './FactionsAccordion'


interface FactionsProps {
  onCloseModal(): void
  activeItem: string | null
}

const Factions: React.FC<FactionsProps> = ({ onCloseModal, activeItem }) => {

  return (
    <div>
      <div
        data-dialog-backdrop="dialog xxl"
        data-dialog-backdrop-close="true"
        className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      >
        <div className="h-screen rounded-lg bg-gray-200 shadow-lg w-full max-w-7xl">
          <div className="flex justify-between items-center p-2">
            <div className="text-xl font-bold font-medium text-slate-800">{activeItem}</div>
            <button className="hover:scale-110 hover:text-black transform transition-all flex w-10 h-10 bg-gray-200 justify-center items-center text-2xl font-extrabold rounded-full cursor-pointer" data-dialog-close="true" type="button" onClick={onCloseModal}>X</button>
          </div>
          <div className="p-4 h-full flex flex-col"> {/* Ensures full height of the viewport */}
            <div className="flex flex-col border bg-gray-200 w-full h-full"> {/* Full height of parent */}
              <div className="px-4 py-5 flex-1 overflow-auto"> {/* Scrollable content */}
                <ul className="space-y-1 pb-10">
                  <FactionsAccordion/>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factions;
