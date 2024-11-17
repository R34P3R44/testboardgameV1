import React, { useState, useEffect} from 'react';
import Aragorn from './characters/aragorn';
import './Map.css';

interface AragornPosition {
    x: number | null;
    y: number | null;
    dateTime: Date | null;
  }

const Map: React.FC = () => {

    const [gridView, setGridView] = useState<boolean>(false);
    const [zoomedMap, setZoomedMap] = useState<boolean>(false);
    const [zoomedMap80, setZoomedMap80] = useState<boolean>(false);
    const [showAragorn, setShowAragorn] = useState<boolean>(false);
    const [dBPosition, setDBPosition] = useState<AragornPosition>({ x: 0, y: 0, dateTime: new Date() });

    useEffect(() => {
        const fetchposition = async () => {
          const res = await fetch('/api/get-position');
          if (res.ok) {
            const data = await res.json();
            const respData = data.positions
            console.log(respData)
            const latestPlayerMove = Array.isArray(respData) ? [...respData].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
            if (latestPlayerMove === undefined || latestPlayerMove === null) {
              setDBPosition({ x: 0, y: 0, dateTime: new Date() })
              setShowAragorn(true)
            }
            else {
              console.log(latestPlayerMove)
              setDBPosition({ x: latestPlayerMove[0].x, y: latestPlayerMove[0].y, dateTime: latestPlayerMove[0].dateTime })
              setShowAragorn(true)
    
            }
          }
          else {
            setDBPosition({ x: 0, y: 0, dateTime: new Date() })
            setShowAragorn(true)
          }
        }
    
        fetchposition()
    
      }, []);




    const mapZoom = () => {
        setZoomedMap(!zoomedMap)
    }

    const mapZoom80 = () => {
        setZoomedMap80(!zoomedMap80)
    }

    const zoomingFeature = () => {
        if(zoomedMap) {
            return "zoomedImage testmap"
        }
        else if(zoomedMap80){
            return "zoomedImg80 testmap"
        }
        else {
            return "testmap img"
        }
    }

    const zoomingFeatureContainer = () => {
        if(zoomedMap) {
            return "zoomedImage-container"
        }
        else if(zoomedMap80){
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
                {showAragorn ? (
                    <Aragorn dBPosition={dBPosition} />
                    ) 
                    : 
                null}

            </div>
        </div>
    );
};

export default Map;

