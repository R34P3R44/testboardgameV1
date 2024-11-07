import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
                <button style={{padding: '10px', height: '50px', borderRadius: '7px', backgroundColor: '#4FC08D', zIndex: 30, }} onClick={switchtoGridView}>{!gridView ? "Hex grid On" : "Hex grid Off"}</button>
                <button className={!zoomedMap80 ? 'zoomButtonStyles' : 'disabledZoomButtonStyles'} onClick={mapZoom}>{!zoomedMap ? "Zoom 30%" : "Back"}</button>
                <button className={!zoomedMap ? 'zoomButtonStyles' : 'disabledZoomButtonStyles'} onClick={mapZoom80}>{!zoomedMap80 ? "Zoom 80%" : "Back"}</button>

            </div>
            <div className='mapContainer'>
                <div className={zoomedMap || zoomedMap80 ? zoomingFeatureContainer() : "image-container"}>
                    <div className={zoomedMap || zoomedMap80 ? zoomingFeature() : 'img testmap'}>
                        {gridView ?
                            <HexagonLayer />
                            :
                            null}
                    </div>
                    {/* <Image
                                src="https://media.wizards.com/2015/images/dnd/resources/Sword-Coast-Map_HighRes.jpg" // Replace with your image URL
                                alt="Zoomable Background"
                                width={1400}
                                height={800}
                                style={{
                                zIndex: 1,
                                opacity: 0.8,
                                }}
                                className={zoomedMap ? "zoomedImg" : "img"} // Ensures it targets the CSS .img class
                            >

                            </Image> */}
                </div>
            </div>
        </>
    );
};

export default Map;

