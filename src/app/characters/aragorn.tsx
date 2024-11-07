import { useEffect, useRef, useState } from 'react';
import { useAbly } from '../../app/lib/useAbly';
import './movableObject.css';

type Position = {
  x: number;
  y: number;
};

type AragornProps = {
  channelName: string;
  getAragornPosition(position: { x: number; y: number }): void;
}

const Aragorn: React.FC<AragornProps> = ({ getAragornPosition, }) => {
  const [position, setPosition] = useState<Position>({ x: 1450, y: 670 });
  const divRef = useRef<HTMLDivElement | null>(null);
  const { sendMessage, messages } = useAbly('draggable-channel');
  const [offset, setOffset] = useState<Position>({ x: 50, y: 50 });

  const [isDragging, setIsDragging] = useState<boolean>(false);


  // Update position on receiving messages from Ably
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.x !== undefined && latestMessage.y !== undefined) {
      setPosition({ x: latestMessage.x, y: latestMessage.y });
    }
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        let newPosition = {
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        };
        setPosition(newPosition)
        getAragornPosition(newPosition)

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
      draggable={false}
      ref={divRef}
      onMouseDown={handleMouseDown}
      className='backdrop'
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '50px',
        height: '70px',
        backgroundColor: 'transparent',
        cursor: 'move',
        zIndex: 2,
      }}
    >
      <div className='aragorn'></div>
    </div>

  );
};

export default Aragorn;
