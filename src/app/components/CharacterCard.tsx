"use client";

import React, { useState } from 'react';
import characterItems from './characters/characterItems'
import Image from 'next/image';
import Boxos from './characters/boxos'
import useStore from '../../pages/Store/useStore';

const CharacterCard: React.FC = () => {

    const { setShow } = useStore();


    const onSelectCharacter = () => {
        setShow(true)
    }

    return (
        <>
            {characterItems.map((char) => (
                <div key={char.id} className="flex flex-col bg-yellow-600 shadow-sm border border-slate-200 rounded-lg h-96 w-52">
                    <div className="m-0.5 overflow-hidden rounded-md h-4/5 flex justify-center items-center">
                        <div className="w-full h-full object-cover">
                            <Image src={char.picture} alt={char.name} />
                        </div>
                    </div>
                    <div className="p-2 text-center h-20">
                        <h4 className="mb-1 text-xl font-semibold text-slate-800">
                            {char.name}
                        </h4>
                        {/* <p className="text-base text-slate-600 mt-4 font-light ">
                            {char.description}
                        </p> */}
                    </div>
                    <div className="flex justify-center p-6 pt-2 gap-7">
                        <button onClick={onSelectCharacter} className="min-w-32  rounded-md bg-blue-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Select
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
};

export default CharacterCard;
