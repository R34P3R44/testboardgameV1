import React, { useState, useEffect } from 'react';
import Imperator from './characters/imperator';
import './Map.css';
import { useSelectedCharacter } from '../Store/useSelectedCharacter';
import Spinner from './Spinner';
// import Timer from './Timer';


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
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [isEndTurnClicked, setIsEndTurnClicked] = useState<boolean>(false);
    // const [showTimer, setShowTimer] = useState<boolean>(false)

    useEffect(() => {
        setShowSpinner(true)
        if(!isEndTurnClicked){
            fetchposition()
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

    // const checkPlayerTime = (result: string) => {
    //     if(parseInt(result, 10) < 5){
    //         setShowTimer(true)
    //     }
    // }

    return (
        <>
            {showSpinner ?
                <div className=''>
                    <Spinner />
                </div>
                :
                null
            }

            <div className=''>
                <div className='flex w-12 bg-yellow-400'>
                    <button onClick={onClickEndTurn} className="fixed left-80 h-10 w-24 top-2 font-extrabold text-black bg-yellow-700 rounded-md border py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black-900 hover:text-white hover:bg-green-800 hover:border-white-800 focus:text-yellow focus:bg-green-800 focus:border-white-800 active:border-slate-800 active:text-white active:bg-white-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        End turn
                    </button>
                    {/* {showTimer ?  */}
                        {/* <div className='fixed left-80 top-16 font-extrabold text-black bg-yellow-700 h-10 rounded-md border content-center'>
                            <Timer checkPlayerTime={checkPlayerTime}/>
                        </div> */}
                         {/* :
                        null
                    }  */}
                    
                </div>
                <div className=''>
                    <div className={"image-container z-30"}>
                        <div className={'img testmap z-30'}></div>
                    </div>
                    {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
                        <Imperator dBPositions={dBPositions} isEndTurnClicked={isEndTurnClicked} resetTurnClick={resetTurnClick}/>
                        :
                        null}
                </div>
            </div>

        </>
    );
};

export default Map;

