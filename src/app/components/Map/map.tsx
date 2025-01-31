"use client"

import React, {useRef} from 'react';
import './Map.css';
import Imperator from '../characters/imperator';

interface MapProps {
    dBPositions: CharacterPosition[];
    showAragorn: boolean;
    isEndTurnClicked: boolean;
    resetTurnClick(): void;
}

type CharacterPosition = {
    charId: string;
    active: boolean;
    latestPositions: {
        x: number | null;
        y: number | null;
        dateTime: string | null;
    } | null;
};

const Map: React.FC<MapProps> = ({isEndTurnClicked, resetTurnClick, showAragorn, dBPositions}) => {

      const mapRef = useRef<HTMLDivElement | null>(null);
    

    return (
        <div className='maps-container' ref={mapRef}>
            <div className='testmap'></div>
            <div className='testmap2'></div>
            {(dBPositions.length > 0 && dBPositions[0].active === true) || showAragorn ?
                <Imperator dBPositions={dBPositions} isEndTurnClicked={isEndTurnClicked} resetTurnClick={resetTurnClick} mapRef={mapRef} />
                :
                null
            }

        </div>
    )
}

export default Map;
