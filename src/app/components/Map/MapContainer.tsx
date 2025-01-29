import React, { useState, useEffect } from 'react';
import Imperator from '../characters/imperator';
import './Map.css';
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';
import Spinner from '../Misc/Spinner';
import Map from './Map';
import HoneycombGrid from './HexagonGrid';

type CharacterPosition = {
    charId: string;
    active: boolean;
    latestPositions: {
        x: number | null;
        y: number | null;
        dateTime: string | null;
    } | null;
};

interface MapProps {
    activeMenuItem: string | null
}

const MapContainer: React.FC<MapProps> = ({ activeMenuItem }) => {

    const [showAragorn, setShowAragorn] = useState<boolean>(false);
    const [dBPositions, setDBPositions] = useState<CharacterPosition[]>([]);
    const {isCharacterSelected, setCharacterSelected } = useSelectedCharacter();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [isEndTurnClicked, setIsEndTurnClicked] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(false)

    useEffect(() => {
        if (activeMenuItem === 'Load game') {
            setShowSpinner(true)
            fetchposition()
        }
        else if (activeMenuItem === 'New game') {
            //WIP call API to deactivate all characters for player based on player ID
            console.log("this is a new game")
        }
    }, []);

    useEffect(() => {
        if (isCharacterSelected) {
            setShowSpinner(true)
            fetchposition()
            setCharacterSelected(false)
        }
        else if (isEndTurnClicked) {
            setShowSpinner(true)
            fetchposition()
        }
    }, [isCharacterSelected, isEndTurnClicked]);

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
                const fallbackPosition: CharacterPosition = {
                    charId: '',
                    active: true,
                    latestPositions: {
                        x: 0,
                        y: 0,
                        dateTime: new Date().toISOString()
                    }
                }
                setDBPositions([fallbackPosition])
                setShowAragorn(true)
            }
        }
        setShowSpinner(false)
    }

    const onClickEndTurn = () => {
        setIsEndTurnClicked(true)
    }

    const resetTurnClick = () => {
        setIsEndTurnClicked(false)
    }

    // const onShowGridClick = () => {
    //     setShowGrid(true)
    // }

    return (
        <>
            {showSpinner &&
                <div className=' h-screen'>
                    <Spinner />
                </div>
            }

            <React.Fragment>
                <div className='z-50'>
                    <button onClick={onClickEndTurn} className="z-50 fixed left-72 h-10 w-24 top-2 font-extrabold text-black bg-yellow-700 rounded-md border py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black-900 hover:text-white hover:bg-green-800 hover:border-white-800 focus:text-yellow focus:bg-green-800 focus:border-white-800 active:border-slate-800 active:text-white active:bg-white-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        End turn
                    </button>
                    <button onClick={() => setShowGrid(!showGrid)} className="z-50 fixed left-24 h-10 w-auto top-2 font-extrabold text-black bg-yellow-700 rounded-md border py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black-900 hover:text-white hover:bg-green-800 hover:border-white-800 focus:text-yellow focus:bg-green-800 focus:border-white-800 active:border-slate-800 active:text-white active:bg-white-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Show Grid
                    </button>
                </div>

                <div className='flex overflow-hidden'>
                    <div className='z-30'>
                        <Map/> 
                    </div>

                    {showGrid ? 
                        <div className='z-40 absolute'>
                            <HoneycombGrid/>
                        </div>
                        :
                        null
                    }
                    
                    {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
                        <div className='z-50 '>
                            <Imperator dBPositions={dBPositions} isEndTurnClicked={isEndTurnClicked} resetTurnClick={resetTurnClick} />
                        </div>
                        :
                        null
                    }
                </div>
            </React.Fragment>

        </>
    );
};

export default MapContainer;

