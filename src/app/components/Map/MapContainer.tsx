import React, { useState, useEffect, useRef, useCallback, } from 'react';
import './MapStyle.css';
import { useSelectedCharacter } from '../../Store/useSelectedCharacter';
import Spinner from '../Misc/Spinner';
import Map from './Map';
import Dice from '../Dice/Dice';
import { CharacterTurn } from '@/app/data-types/characterType';
import { useCharacterInventory } from '@/app/Store/useCharacterInventory';
import { updateCharacterInventory } from '@/app/_restApiFn/send-updateCharacterInventory';
import { SuccesAlert, FailAlert } from '../Misc/Alert';
import { AlertTypes } from '../../data-types/characterType';
import { CharacterPosition } from '@/app/data-types/characterType';
import { useHexagonItems } from "@/app/Store/useHexagonItems";
import { postHexagonItems } from '@/app/_restApiFn/post-hexagonItems';
import { getHexLayerEnemies } from '@/app/_restApiFn/getHexLayerEnemies';
import { EnemyPosition } from '@/app/data-types/characterType';
import SideBar from '../SideBar/SideBar';
import { dicesArray } from '@/app/data-types/constants';
import { SideBarPosition } from '@/app/data-types/characterType';
import { getDataForMouseMove } from '@/app/utilityFunctions/getDataForMouseMove';
import { useGameMenuNavigation } from '@/app/Store/useGameMenuNavigation';


const MapContainer: React.FC = () => {

    const [showAragorn, setShowAragorn] = useState<boolean>(false);
    const [dBPositions, setDBPositions] = useState<CharacterPosition[]>([]);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [isEndTurnClicked, setIsEndTurnClicked] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(false)
    const [turn, setTurn] = useState<CharacterTurn>({ enemy: false, friendly: false, className: '' })
    const [currentDiceNumber, setCurrentDiceNumber] = useState<Dice | null>(null)
    const [isRolling, setIsRolling] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertTypes>({ success: false, fail: false })
    const [enemyPositions, setEnemyPositions] = useState<EnemyPosition[]>([]);
    const [showSideBar, setShowSideBar] = useState<boolean>(true)
    const [newSidebarPosition, setNewSidebarPosition] = useState<SideBarPosition>({ x: 5, y: 5 });

    const {hexagonItems, setHexagonItems} = useHexagonItems();
    const {isCharacterSelected, setIsCharacterSelected} = useSelectedCharacter();
    const {characterInventory} = useCharacterInventory();
    const {activeGameMenuItem} = useGameMenuNavigation()

    const sideBarRef = useRef<HTMLDivElement>(null);
    const mapIdRef = useRef<string>("BalinsTomb");

    useEffect(() => {
        if (activeGameMenuItem === 'Load game') {
            setShowSpinner(true)
            fetchposition()
            fetchEnemyPositions()
        }
        // setTurn({ enemy: true, friendly: false, className: `fill-current ${'bg-enemyDice'} rounded-lg` })

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
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

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setShowSideBar(prevState => !prevState)
        }
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

    const fetchEnemyPositions = async () => {
        const res = await fetch(`/api/get-hexLayer-enemies?mapId=${encodeURIComponent(mapIdRef.current)}`);
        if (res.ok) {
            const data: EnemyPosition[] = await res.json();
            console.log("API Response:", data);
            if (data) {
                setEnemyPositions(data)
                console.log("API Response SET:", data);
            }
            else {
                setEnemyPositions([])
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

    const saveHexgonItems = async () => {
        if (mapIdRef.current && hexagonItems) {
            try {
                const response = await postHexagonItems(mapIdRef.current, hexagonItems);
                if (response.success) {
                    setAlert({ success: true, fail: false })
                }
                else {
                    setAlert({ success: false, fail: true })
                }
            }
            catch (error) {
                console.error("Error posting items");
            }
        }
        else {
            console.error("Character inventory is empty.");
        }
        setTimeout(() => setAlert({ success: false, fail: false }), 3000);
    }

    const showHexGrid = () => {
        setShowGrid(!showGrid)
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();

        if(!sideBarRef.current) return 

        const sideBar = sideBarRef.current;
        const firstChild = sideBar.querySelector(":first-child") as HTMLElement | null;
        
        if (!firstChild) return;

        const moveData = getDataForMouseMove(event, firstChild)

        const handleMouseMove = (e: MouseEvent) => {

            const restrictedX = Math.max(0, Math.min(e.clientX - moveData.offsetX, moveData.startTestX));
            const restrictedY = Math.max(0, Math.min(e.clientY - moveData.offsetY, moveData.startTestY));

            setNewSidebarPosition({x: restrictedX, y: restrictedY});
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
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
                <React.Fragment>
                    <Spinner />
                </React.Fragment>
            }

            <React.Fragment>
                <div ref={sideBarRef} >
                    {showSideBar ?
                        <div className='absolute z-50 h-auto p-1 bg-gray-900 rounded-xl cursor-move'
                            style={{
                                left: `${newSidebarPosition.x}px`,
                                top: `${newSidebarPosition.y}px`,
                            }}

                            onMouseDown={handleMouseDown}
                            draggable={false}
                        >
                            <SideBar
                            // handleItemClick={handleItemClick}
                            />
                            <div className='flex flex-col h-80 w-auto justify-around flex-wrap'>
                                <button onClick={() => onClickEndTurn()} className="z-50 h-10 w-24 top-2 p-1 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 " type="button">
                                    End turn
                                </button>
                                <button
                                    className={isRolling ? "w-24 p-1 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 opacity-50 cursor-not-allowed pointer-events-none" : "w-24 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900"}
                                    onClick={() => onClickRoll()}
                                >
                                    New roll
                                </button>
                                <div className='z-50 rounded-lg w-12 h-12 relative left-5'>
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
                                <button onClick={() => showHexGrid()} className="z-50 h-10 w-24 top-2 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 " type="button">
                                    Hex grid
                                </button>
                                <button onClick={() => saveHexgonItems()} className="z-50 h-10 w-auto top-10 p-2 btn btn-outline font-bold text-sm text-yellow-500 bg-gray-900 " type="button">
                                    Upload data
                                </button>

                            </div>
                        </div>
                        :
                        null
                    }
                    <div>
                        <Map
                            mapIdRef={mapIdRef.current}
                            resetTurnClick={resetTurnClick}
                            isEndTurnClicked={isEndTurnClicked}
                            showAragorn={showAragorn}
                            dBPositions={dBPositions}
                            enemyPositions={enemyPositions}
                            showGrid={showGrid}
                        />
                    </div>
                </div>
            </React.Fragment>
        </>
    );
};

export default MapContainer;

