import React, { useState, useEffect } from 'react';
import Imperator from './characters/imperator';
import './Map.css';
import { useSelectedCharacter } from '../Store/useSelectedCharacter';
import Spinner from './Spinner';


type CharacterPosition = {
    charId: string;
    active: boolean;
    latestPositions: {
        x: number | null;
        y: number | null;
        dateTime: string | null;
    } | null;
};

const Map: React.FC = () => {

    const [showAragorn, setShowAragorn] = useState<boolean>(false);
    const [dBPositions, setDBPositions] = useState<CharacterPosition[]>([]);
    const {isCharacterSelected, setCharacterSelected} = useSelectedCharacter();
    const [showSpinner, setShowSpinner] = useState<boolean>(false)


    useEffect(() => {
        setShowSpinner(true)
        fetchposition()
    }, []);

    const fetchposition = async () => {
        const res = await fetch('/api/get-position');
        if (res.ok) {
            const data: CharacterPosition[] = await res.json();
            console.log("API Response:", data);
            if (data) {
                setDBPositions(data)
                console.log("API Response SET:", data);
            }
            else {
                const fallbackPOsition: CharacterPosition = {
                    charId: '',
                    active: true,
                    latestPositions: {
                        x: 100,
                        y: 100,
                        dateTime: new Date().toISOString()
                    }
                }
                setDBPositions([fallbackPOsition])
                setShowAragorn(true)
            }
            setShowSpinner(false)
        }
    }

    useEffect(() => {
        if(isCharacterSelected) {
            setShowSpinner(true)
            fetchposition()
            setCharacterSelected(false)
        }
    }, [isCharacterSelected]);


    return (
        <>
        {showSpinner ? 
            <div className=''>
                <Spinner/>
            </div>
            :
            null
        }

        <div className=''>
            <div className='mapContainer pt-16'>
                <div className={"image-container z-30"}>
                    <div className={'img testmap z-30'}></div>
                </div>
                {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
                    <Imperator dBPositions={dBPositions} />
                    :
                    null}
            </div>
        </div>

        </>
    );
};

export default Map;

