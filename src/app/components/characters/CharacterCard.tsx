"use client";

import React, { useState, useEffect } from 'react';
import { updateCharacters } from '../../_restApiFn/send-updateCharacters'
import { FactionsData } from "../../../app/data-types/characterType";
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';

interface CharacterCardProps {
    factionsData: FactionsData[]
}

const CharacterCard: React.FC<CharacterCardProps> = ({ factionsData }) => {

    const {setIsCharacterSelected} = useSelectedCharacter();
    const [isSelected, setIsSelected] = useState<boolean>(false);



    useEffect(() => {
        if (isSelected) {
            setIsCharacterSelected(true)
        }

    }, [isSelected]);

    const onSelectCharacter = async (facData: any) => {
        await updateCharacters(facData.charId, true)
        setIsSelected(true)
    }

    return (
        <>
            {factionsData.map((facData) => (
                <div key={facData.id} className="flex flex-col bg-yellow-600 shadow-sm border border-slate-200 rounded-lg h-96 w-52">
                    <div className="m-0.5 overflow-hidden rounded-md h-4/5 flex justify-center items-center">
                        <div className="w-full h-full object-cover">
                            {/* <Image src={char.picture} alt={char.name} /> */}
                        </div>
                    </div>
                    <div className="p-2 text-center h-20">
                        <h4 className="mb-1 text-xl font-semibold text-slate-800">
                            {facData.charId}
                        </h4>
                    </div>
                    <div className="flex justify-center p-6 pt-2 gap-7">
                        <button
                            onClick={() => { onSelectCharacter(facData) }}
                            className="min-w-32  rounded-md bg-blue-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Select
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
};

export default CharacterCard;
