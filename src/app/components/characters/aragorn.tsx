import { useEffect, useRef, useState } from 'react';
// import { useAbly } from '../../app/lib/useAbly';
import './movableObject.css';
// import Ably from 'ably';
// import { Position } from "../../app/data-types/characterType";
import {sendPosition} from '../../../pages/api/send-position'

type Positions = {
  x: number | null;
  y: number | null;
  dateTime: Date | null
};


type Offset = {
  x: number;
  y: number;
};



type AragornProps = {
  // channelName: string;
  dBPosition: { x: number | null, y: number | null, dateTime: Date | null }
  // getAragornPosition(position: { x: number; y: number }): void;
}

const Aragorn: React.FC<AragornProps> = ({dBPosition }) => {

  //uncomment to use ably updates
  // const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  // const channel = ably.channels.get(channelName);
  // const { sendMessage, messages } = useAbly('draggable-channel');

  const [newPosition, setNewPosition] = useState<Positions>({ x: 0, y: 0, dateTime: new Date() });
  const divRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    if (dBPosition.dateTime) {
      setNewPosition({ x: dBPosition.x, y: dBPosition.y, dateTime: null })
    }
    else {
      setNewPosition({ x: 0, y: 0, dateTime: null })
    }

  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && (offset.x && offset.y)) {
      const position = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
        dateTime: new Date()
      };
      setNewPosition(position)
      // getAragornPosition(newPosition)
    }
  };


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
  };

  //uncomment to use ably updates
  // useEffect(() => {
  //   // Publish the new position to Ably
  //   channel.publish('position-update', position);
  // }, [position]);

  return (
    <div
      draggable={false}
      ref={divRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${newPosition.x}px`,
        top: `${newPosition.y}px`,
        width: '50px',
        height: '70px',
        backgroundColor: 'transparent',
        cursor: 'move',
        zIndex: 3,
      }}
    >
      <div className='aragorn'>
        <div className='relative bottom-12 width text-yellow-400 font-semibold bg-blue-800 rounded-lg flex justify-center'>{`X: ${newPosition.x}px, Y: ${newPosition.y}px, Date&Time: ${newPosition?.dateTime?.toISOString()}`}</div>
      </div>
    </div>

  );
};

export default Aragorn;
