import React, { useState, useEffect } from 'react';
import Imperator from './characters/imperator';
import Boxos from './characters/boxos';
import './Map.css';
import useStore from '../../pages/Store/useStore';

interface CharacterPosition {
    x: number | null;
    y: number | null;
    dateTime: Date | null;
    charId: string | null;
}

const Map: React.FC = () => {

    const [zoomedMap, setZoomedMap] = useState<boolean>(false);
    const [zoomedMap80, setZoomedMap80] = useState<boolean>(false);
    const [showAragorn, setShowAragorn] = useState<boolean>(false);
    const [showAragorn2, setShowAragorn2] = useState<boolean>(false);
    const [dBPositions, setDBPositions] = useState<CharacterPosition>({ x: 0, y: 0, dateTime: new Date(), charId: '' });

    const { show } = useStore();

    useEffect(() => {
        const fetchposition = async () => {
            const res = await fetch('/api/get-position');
            if (res.ok) {
                const data = await res.json();
                const respData = data.positions
                console.log(respData)
                const playerMovesByCharName = respData.filter((obj: any, index: any, self: any) => self.findIndex((o: any) => o.charId === obj.charId) === index);
                // const latestPlayerMove = Array.isArray(respData) ? [...respData].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
                if (playerMovesByCharName === undefined || playerMovesByCharName === null) {
                    setDBPositions({ x: 100, y: 100, dateTime: new Date(), charId: '' })
                    setShowAragorn(true)
                    setShowAragorn2(true)
                }
                else {
                    setDBPositions(playerMovesByCharName)
                    setShowAragorn(true)
                    setShowAragorn2(true)
                }
            }
            // else {
            //     setDBPositions({ x: 0, y: 0, dateTime: new Date(), charId: '' })
            //     setShowAragorn(true)
            //     setShowAragorn2(true)
            // }
        }

        fetchposition()

    }, []);

    useEffect(() => {
        if (show || dBPositions.dateTime) {
            setShowAragorn2(true)
        }
    }, [show]);

    const mapZoom = () => {
        setZoomedMap(!zoomedMap)
    }

    const mapZoom80 = () => {
        setZoomedMap80(!zoomedMap80)
    }

    const zoomingFeature = () => {
        if (zoomedMap) {
            return "zoomedImage testmap"
        }
        else if (zoomedMap80) {
            return "zoomedImg80 testmap"
        }
        else {
            return "testmap img"
        }
    }

    const zoomingFeatureContainer = () => {
        if (zoomedMap) {
            return "zoomedImage-container"
        }
        else if (zoomedMap80) {
            return "zoomedImage80-container"
        }
        else {
            return "image-container"
        }
    }

    return (
        <div className=''>
            <div className=' fixed left-60 top-6 flex flex-col justify-between pl-32 items-space h-28'>
                <button className={!zoomedMap80 ? 'p-2 h-12 rounded-md bg-green-700 text-white' : 'p-2 h-12 rounded-md bg-green-700 text-white pointer-events-none'} onClick={mapZoom}>{!zoomedMap ? "Zoom 30%" : "Back"}</button>
                <button className={!zoomedMap ? 'p-2 h-12 rounded-md bg-green-700 text-white' : 'p-2 h-12 rounded-md bg-green-700 text-white pointer-events-none'} onClick={mapZoom80}>{!zoomedMap80 ? "Zoom 80%" : "Back"}</button>
            </div>
            <div className=' mapContainer pt-16'>
                <div className={zoomedMap || zoomedMap80 ? zoomingFeatureContainer() : "image-container z-30"}>
                    <div className={zoomedMap || zoomedMap80 ? zoomingFeature() : 'img testmap z-30'}></div>
                </div>
                {showAragorn ?
                    <Imperator dBPositions={dBPositions} />

                    :
                    null}
                {showAragorn2 ?
                    <Boxos dBPositions={dBPositions} />
                    :
                    null}
            </div>
        </div>
    );
};

export default Map;

