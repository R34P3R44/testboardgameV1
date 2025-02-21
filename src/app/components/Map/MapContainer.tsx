import React, { useState, useEffect } from 'react';
import './MapStyle.css';
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';
import Spinner from '../Misc/Spinner';
import Map from './Map';
// import HoneycombGrid from './HexagonGrid';
import Dice from '../Dice/Dice';
import { CharacterTurn } from '@/app/data-types/characterType';
import { BsDice1, BsDice2, BsDice3, BsDice4, BsDice5, BsDice6 } from "react-icons/bs";
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
import { updateCharacterInventory } from '@/app/_restApiFn/send-updateCharacterInventory';
import { SuccesAlert, FailAlert } from '../Misc/Alert';
import { AlertTypes } from '../../data-types/characterType';


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
    const { isCharacterSelected, setIsCharacterSelected } = useSelectedCharacter();
    const { characterInventory } = useCharacterInventory();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [isEndTurnClicked, setIsEndTurnClicked] = useState<boolean>(false);
    // const [showGrid, setShowGrid] = useState<boolean>(false)
    const [turn, setTurn] = useState<CharacterTurn>({ enemy: false, friendly: false, className: '' })
    const [currentDiceNumber, setCurrentDiceNumber] = useState<Dice | null>(null)
    const [isRolling, setIsRolling] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertTypes>({ success: false, fail: false })


    const dicesArray: Dice[] = [
        { key: 1, value: BsDice1 },
        { key: 2, value: BsDice2 },
        { key: 3, value: BsDice3 },
        { key: 4, value: BsDice4 },
        { key: 5, value: BsDice5 },
        { key: 6, value: BsDice6 }
    ]


    useEffect(() => {
        if (activeMenuItem && activeMenuItem === 'Load game') {
            setShowSpinner(true)
            fetchposition()
        }
        // else if (activeMenuItem && activeMenuItem === 'New game') {
        //     console.log("this is a new game")
        // }
        setTurn({ enemy: true, friendly: false, className: `fill-current ${'bg-enemyDice'} rounded-lg` })

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

    const onClickEndTurn = async () => {
        setIsEndTurnClicked(true)
        await saveInventory()
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


    const saveInventory = async () => {

        if (dBPositions[0].charId) {
            try {
                const response = await updateCharacterInventory(dBPositions[0].charId, characterInventory);
                if (response.success) {
                    setAlert({ success: true, fail: false });
                } else {
                    setAlert({ success: false, fail: true });
                }
            } catch (error) {
                console.error("Error updating character inventory:", error);
            }
        } else {
            console.error("Character inventory is empty.");
        }
        setTimeout(() => setAlert({ success: false, fail: false }), 3000);
    };


    return (


        <>
            {(alert.success || alert.fail) && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-top">
                    {alert.success && !alert.fail && <SuccesAlert alert={alert} />}
                    {alert.fail && !alert.success && <FailAlert alert={alert} />}
                </div>
            )}

            {showSpinner &&
                <div className=''>
                    <Spinner />
                </div>
            }

            <React.Fragment>
                <div className='z-50 absolute left-24 top-5 h-14 flex justify-around w-96 items-center'>
                    <div className='w-24 h-12'>
                        <button onClick={onClickEndTurn} className="z-50 h-10 w-24 top-2 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 " type="button">
                            End turn
                        </button>
                    </div>
                    <div className='w-24 h-12'>
                        <button
                            className={isRolling ? " w-24 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 opacity-50 cursor-not-allowed pointer-events-none" : "w-24 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900"}
                            onClick={() => onClickRoll()}
                        >
                            New roll
                        </button>
                    </div>
                    <div className='z-50 rounded-lg w-12 h-12'>
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
                        <Map resetTurnClick={resetTurnClick} isEndTurnClicked={isEndTurnClicked} showAragorn={showAragorn} dBPositions={dBPositions} />
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

