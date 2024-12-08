import { useEffect, useRef, useState } from 'react';
// import { useAbly } from '../../app/lib/useAbly';
import './movableObject.css';
// import Ably from 'ably';
// import { Position } from "../../app/data-types/characterType";
import { CharacterPosition } from "../../../app/data-types/characterType";
import {sendPosition} from '../../../pages/_restApiFn/send-position'
import Moverange from '../Moverange'

type Positions = {
  x: number | null;
  y: number | null;
  dateTime: Date | null
};

type MoveRangePositions = {
  x: number | null;
  y: number | null;
};

type Offset = {
  x: number;
  y: number;
};

type ImperatorProps = {
  // channelName: string;
  dBPositions: CharacterPosition[]

  // getAragornPosition(position: { x: number; y: number }): void;
}

const Imperator: React.FC<ImperatorProps> = ({dBPositions }) => {

  //uncomment to use ably updates
  // const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  // const channel = ably.channels.get(channelName);
  // const { sendMessage, messages } = useAbly('draggable-channel');

  const [newPosition, setNewPosition] = useState<Positions>({ x: 0, y: 0, dateTime: new Date(), });
  const [moveRangePosition, setMoveRangePosition] = useState<MoveRangePositions>({ x: 0, y: 0 });

  const divRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showMoveRange, setShowMoveRange] = useState<boolean>(false);

  useEffect(() => {
    if (dBPositions[0].latestPositions?.x === null || dBPositions[0].latestPositions?.y === null) {
      console.log("Invalid position: x or y is null.")

      throw new Error("Invalid position: x or y is null.");
    }
    
    if (dBPositions[0].latestPositions?.dateTime) {
      setNewPosition({ x: dBPositions[0].latestPositions?.x, y: dBPositions[0].latestPositions?.y, dateTime: null });
      setMoveRangePosition(moveRangePosition);
    } else {
      setNewPosition({ x: 0, y: 0, dateTime: null });
      setMoveRangePosition({ x: 0, y: 0 });
    }
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && (offset.x && offset.y)) {
      const position = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
        dateTime: new Date(),
        charId: 'RoadKill1'
      };
      setNewPosition(position)
      // getAragornPosition(newPosition)
    }
  };

  useEffect(() => {
    if (!showMoveRange && newPosition.x && newPosition.y) {
      setMoveRangePosition({
        x: newPosition.x + 100,
        y: newPosition.y + 10,
      });
    }
  }, [newPosition, showMoveRange]);


  useEffect(() => {
    const handleMouseUp = async () => {
      setIsDragging(false);

      sendPosition(newPosition)
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, newPosition]);


  const handleMouseDown = (e: React.MouseEvent) => {
    if (newPosition.x !== null && newPosition.y !== null) {
      // e.preventDefault();
      setIsDragging(true);
      setOffset({
        x: e.clientX - newPosition.x,
        y: e.clientY - newPosition.y,
      });
    }
    else if(showMoveRange){
      setIsDragging(false);
    }
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    if(e){
      e.preventDefault();
      setShowMoveRange(!showMoveRange)
    }
  }

  //uncomment to use ably updates
  // useEffect(() => {
  //   // Publish the new position to Ably
  //   channel.publish('position-update', position);
  // }, [position]);

  return (
    <>
      <div
        draggable={false}
        ref={divRef}
        onMouseDown={handleMouseDown}
        onContextMenu={onDoubleClick}
        style={{
          position: 'absolute',
          left: `${newPosition.x}px`,
          top: `${newPosition.y}px`,
          width: '50px',
          height: '70px',
          backgroundColor: 'transparent',
          cursor: 'move',
        }}
        className='z-40'
      >      
        <div className='aragorn'>
        {showMoveRange ? 
          <Moverange dBPositions={dBPositions}/>
          :
          null
        }
        </div>
      </div>

    </>

  );
};

export default Imperator;
