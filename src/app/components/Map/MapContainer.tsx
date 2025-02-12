import React, { useState, useEffect } from 'react';
import './Map.css';
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';
import Spinner from '../Misc/Spinner';
import Map from './Map';
// import HoneycombGrid from './HexagonGrid';
import Dice from '../Dice/Dice';
import { CharacterTurn } from '@/app/data-types/characterType';
import { BsDice1, BsDice2, BsDice3, BsDice4, BsDice5, BsDice6 } from "react-icons/bs";


type CharacterPosition = {
    charId: string;
    active: boolean;
    latestPositions: {
        x: number | null;
        y: number | null;
        dateTime: string | null;
    } | null;
};




interface MapContainerProps {
    activeMenuItem: string | null
}

const MapContainer: React.FC<MapContainerProps> = ({ activeMenuItem }) => {

    const [showAragorn, setShowAragorn] = useState<boolean>(false);
    const [dBPositions, setDBPositions] = useState<CharacterPosition[]>([]);
    const {isCharacterSelected, setIsCharacterSelected } = useSelectedCharacter();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [isEndTurnClicked, setIsEndTurnClicked] = useState<boolean>(false);
    // const [showGrid, setShowGrid] = useState<boolean>(false)
    const [turn, setTurn] = useState<CharacterTurn>({enemy: false, friendly: false, className: ''})
    const [currentDiceNumber, setCurrentDiceNumber] = useState<Dice | null>(null)
    const [isRolling, setIsRolling] = useState<boolean>(false)


    const dicesArray: Dice[] = [
        { key: 1, value: BsDice1},
        { key: 2, value: BsDice2},
        { key: 3, value: BsDice3},
        { key: 4, value: BsDice4},
        { key: 5, value: BsDice5},
        { key: 6, value: BsDice6}
    ]


    useEffect(() => {
        if (activeMenuItem && activeMenuItem === 'Load game') {
            setShowSpinner(true)
            fetchposition()
        }
        // else if (activeMenuItem && activeMenuItem === 'New game') {
        //     console.log("this is a new game")
        // }
        setTurn({enemy: true, friendly: false, className: `fill-current ${'bg-enemyDice'} rounded-lg`})

        // setTurn({enemy: true, friendly: false, className: `fill-current ${'bg-friendlyDice'} rounded-lg`})

    }, []);

    useEffect(() => {
        if (isCharacterSelected) {
            setShowSpinner(true)
            fetchposition()
            setIsCharacterSelected(false)
        }
        else if (isEndTurnClicked) {
            setShowSpinner(true)
            fetchposition()
        }
    }, [isCharacterSelected, isEndTurnClicked, setIsCharacterSelected]);

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

    const onClickRoll = () => {
        setIsRolling(true)
        setTimeout(() => {
            const diceObject = generateRandomNumber()
            setCurrentDiceNumber(diceObject)
            setIsRolling(false)
        }, 600)

    }

    const generateRandomNumber = (): Dice | null => {
            const randomnumber: number = Math.floor(Math.random() * 6) + 1;
            const diceObject: Dice | null = dicesArray.find((number) => number.key === randomnumber) || null;
            return diceObject
    }

    // const onShowGridClick = () => {
    //     setShowGrid(true)
    // }

    return (
        <>
            {showSpinner &&
                <div className=''>
                    <Spinner />
                </div>
            }

            <React.Fragment>
                <div className='z-50'>
                    <button onClick={onClickEndTurn} className="z-50 fixed left-72 h-10 w-24 top-2 font-extrabold text-black bg-yellow-700 rounded-md border py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black-900 hover:text-white hover:bg-green-800 hover:border-white-800 focus:text-yellow focus:bg-green-800 focus:border-white-800 active:border-slate-800 active:text-white active:bg-white-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        End turn
                    </button>
                    <button 
                        className={isRolling ? "absolute left-72 top-20 w-24 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 opacity-50 cursor-not-allowed pointer-events-none" : "absolute left-72 top-20 w-24 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900"} 
                        onClick={() => onClickRoll()}
                    >
                        New roll
                    </button>
                    
                    <div className='z-50 h-96 w-96 absolute left-72 top-40 rounded-lg'>
                        <Dice 
                            currentDiceNumber={currentDiceNumber}
                            isRolling={isRolling}
                            dice={{
                                enemy: turn.enemy,
                                friendly: turn.friendly,
                                className: turn.className
                            }}
                        />
                    </div>
                </div>

                <div className='overflow-auto'>
                    <div className='z-30'>
                        <Map resetTurnClick={resetTurnClick} isEndTurnClicked={isEndTurnClicked} showAragorn={showAragorn} dBPositions={dBPositions}/> 
                    </div>

                    {/* {showGrid ? 
                        <div className='z-40 absolute '>
                            <HoneycombGrid/>
                        </div>
                        :
                        null
                    } */}
                    
                </div>
            </React.Fragment>

        </>
    );
};

export default MapContainer;

