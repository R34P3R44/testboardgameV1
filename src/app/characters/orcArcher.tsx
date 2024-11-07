// components/Draggable.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import './movableObject.css';
import { useAbly } from '../../app/lib/useAbly';


type OrcArcherProps = {
  // channelName: string;
  getArcherPosition(position: { x: number; y: number }): void;
}

type Position = {
  x: number;
  y: number;
};

const OrcArcher: React.FC<OrcArcherProps> = ({getArcherPosition}) => {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 1250, y: 250 });
  const { sendMessage, messages } = useAbly('draggable-channel');
  const [offset, setOffset] = useState<Position>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  // Update position on receiving messages from Ably
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.x !== undefined && latestMessage.y !== undefined) {
      setPosition({ x: latestMessage.x, y: latestMessage.y });
    }
  }, [messages]);

  // Handle drag event
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        let newPosition = {
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        };
        setPosition(newPosition)
        getArcherPosition(newPosition)
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
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
  }, [isDragging, offset]);


  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };



  return (
    <div
      ref={divRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '50px',
        height: '70px',
        backgroundColor: 'transparent',
        cursor: 'move',
        zIndex: 3
      }}
    >
    <div className='orcArcher'></div>
    
    </div>
  );
};

export default OrcArcher;
