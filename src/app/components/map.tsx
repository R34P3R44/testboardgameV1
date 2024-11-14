import React, { useState,} from 'react';
import HexagonLayer from './hexagonLayer';
import './map.css';

const Map: React.FC = () => {

    const [gridView, setGridView] = useState<boolean>(false);
    const [zoomedMap, setZoomedMap] = useState<boolean>(false);
    const [zoomedMap80, setZoomedMap80] = useState<boolean>(false);


    const switchtoGridView = () => {
        setGridView(!gridView)
    }

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
        <>
            <div style={{marginTop: '10px', width: '150px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <button className='p-2 h-12 rounded-md bg-green-700 text-white' onClick={switchtoGridView}>{!gridView ? "Hex grid On" : "Hex grid Off"}</button>
                <button className={!zoomedMap80 ? 'p-2 h-12 rounded-md bg-green-700 text-white' : 'p-2 h-12 rounded-md bg-green-700 text-white pointer-events-none'} onClick={mapZoom}>{!zoomedMap ? "Zoom 30%" : "Back"}</button>
                <button className={!zoomedMap ? 'p-2 h-12 rounded-md bg-green-700 text-white' : 'p-2 h-12 rounded-md bg-green-700 text-white pointer-events-none'} onClick={mapZoom80}>{!zoomedMap80 ? "Zoom 80%" : "Back"}</button>

            </div>
            <div className='mapContainer pt-16'>
                <div className={zoomedMap || zoomedMap80 ? zoomingFeatureContainer() : "image-container"}>
                    <div className={zoomedMap || zoomedMap80 ? zoomingFeature() : 'img testmap'}>
                        {gridView ?
                            <HexagonLayer />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Map;

