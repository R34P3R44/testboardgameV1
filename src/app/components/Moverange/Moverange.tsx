
"use client";

import React, { useState, useEffect } from 'react';
import { CharacterPosition, EnemyPosition, MoveRangePositions, Positions } from '@/app/data-types/characterType';


interface MoverangePropps {
    newPosition: MoveRangePositions;
    showCharMoveRange: boolean;
    contextMenuType: string;
    // showEnemyMoveRange: boolean;
}

const Moverange: React.FC<MoverangePropps> = ({ newPosition, showCharMoveRange, contextMenuType }) => {

    const [moveRangePosition, setMoveRangePosition] = useState<MoveRangePositions | null>({ x: null, y: null });

    useEffect(() => {
        checkCharacterType()
    }, [showCharMoveRange]);

    const checkCharacterType = () => {
        if(newPosition.x && newPosition.y) {
            if (showCharMoveRange && contextMenuType === "Character") {
                const newX = (newPosition.x - 360) + 40;
                const newY = (newPosition.y - 360) + 40;
                setMoveRangePosition({ x: newX, y: newY })
            }    
        }
        // else if(showEnemyMoveRange) {

        // }
    }

    return (
        <>
        {moveRangePosition ? 
            <div 
            style={{
                width: 720,
                height: 720,
                borderRadius: "50%",
                left: `${moveRangePosition && moveRangePosition.x}px`,
                top: `${moveRangePosition && moveRangePosition.y}px`,
            }}
                className='absolute rounded-full border-2 border-yellow-700'>
            <div
                style={{
                    width: "100%", 
                    height: "100%", 
                }}
                className="absolute bg-yellow-500 rounded-full opacity-50 animate-wave-effect "></div>
        </div>
        :
        null

        }

        </>
    )
};

export default Moverange;
