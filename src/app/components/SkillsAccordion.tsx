"use client";

import React, {useEffect, useState} from 'react';
import CharacterCard from './CharacterCard'
import skillsContent from './AllSkills'
type FactionsData = {
    id: number;
    active: boolean;
    charId: string;
    description: string;
  }

const FactionsAccordion: React.FC = () => {

    const [factionsData, setFactionsData] = useState<FactionsData[]>([])

    useEffect(() => {
        const fetchFactions = async () => {
            const res = await fetch('/api/get-factions');
            if(res.ok){
                const data: FactionsData[] = await res.json();
                console.log("API Response", data);
                if(data){
                    setFactionsData(data)
                    console.log("API Response SET:", data);
                }
                else {
                    const fallbackFaction: FactionsData = {
                        id: 0,
                        active: false,
                        charId: '',
                        description: '',
                    }
                    setFactionsData([fallbackFaction])
                }
            }
        }

        fetchFactions()
    }, []);


    return (
        <>
            {skillsContent.map((skill) => (

                <li key={skill.id}>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </summary>
                        <div className="gap-8 px-4 flex w-full">
                            <CharacterCard factionsData={factionsData}/>
                        </div>
                    </details>
                </li>
            ))}

        </>
    )
};

export default FactionsAccordion;