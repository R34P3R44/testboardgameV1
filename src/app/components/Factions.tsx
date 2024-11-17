"use client";
import React from 'react';
import CharacterCard from './CharacterCard'
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
        className="overflow-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      >
        <div className="rounded-lg bg-white shadow-lg w-full max-w-7xl">
          <div className="flex justify-between items-center pb-4">
            <div className="text-xl font-medium text-slate-800">{activeItem}</div>
            <button className="hover:scale-110 hover:text-black transform transition-all flex w-10 h-10 bg-gray-200 justify-center items-center text-2xl font-extrabold rounded-full cursor-pointer" data-dialog-close="true" type="button" onClick={onCloseModal}>X</button>
          </div>
          <div className='mx-10'>
            <FactionsAccordion/>
          </div>
          <div className="rounded-lg bg-white shadow-sm grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            <CharacterCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factions;
