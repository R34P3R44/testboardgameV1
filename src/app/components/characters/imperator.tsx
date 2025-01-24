import { useEffect, useRef, useState } from 'react';
import './movableObject.css';
import { CharacterPosition } from "../../../app/data-types/characterType";
import { sendPosition } from '../../_restApiFn/send-position'
import ContextMenu from '../ContextMenu'

type Positions = {
  x: number | null;
  y: number | null;
  dateTime: Date | null
};

// type MoveRangePositions = {
//   x: number | null;
//   y: number | null;
// };

type ImperatorProps = {
  dBPositions: CharacterPosition[];
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
}

const Imperator: React.FC<ImperatorProps> = ({ dBPositions, isEndTurnClicked, resetTurnClick }) => {

  const divRef = useRef<HTMLDivElement | null>(null);
  const [newPosition, setNewPosition] = useState<Positions>({ x: 0, y: 0, dateTime: new Date(), });
  // const [moveRangePosition, setMoveRangePosition] = useState<MoveRangePositions>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showContext, setShowContext] = useState<boolean>(false);

  useEffect(() => {
    console.log("Effect: 1")

    if (dBPositions[0].latestPositions?.x === null || dBPositions[0].latestPositions?.y === null) {
      throw new Error("Invalid position: x or y is null.");
    }

    if (dBPositions[0].latestPositions?.dateTime) {
      setNewPosition({ x: dBPositions[0].latestPositions?.x, y: dBPositions[0].latestPositions?.y, dateTime: null });
    } else {
      setNewPosition({ x: 0, y: 0, dateTime: null });
    }
  }, []);


  useEffect(() => {
    if(isDragging && newPosition) {
      console.log("Effect: 2")
      const handleMouseUp = async () => {
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
    }
  }, [isDragging, newPosition]);

  useEffect(() => {
    if (isEndTurnClicked && newPosition.x !== null && newPosition.y !== null && newPosition.dateTime !== null
    ) {
      console.log("Effect: 3")

      sendPosition(newPosition)
      console.log("Sending position")

      resetTurnClick()
    }
  }, [isEndTurnClicked, newPosition]);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const position = {
        x: e.clientX,
        y: e.clientY,
        dateTime: new Date(),
        charId: 'RoadKill1'
      };
      setNewPosition(position)
    }
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    if (newPosition.x !== null && newPosition.y !== null && e.nativeEvent.button === 0 && !showContext) {
      e.preventDefault();
      setIsDragging(true);
    }
    else if (showContext) {
      setIsDragging(false);
    }
  };

  const closeContextMenu = () => {
    setShowContext(false)
  }

  const onRightClick = (e: React.MouseEvent) => {
    setIsDragging(false);
    if (e) {
      e.preventDefault();
      setShowContext(!showContext)
    }
  }

  return (
    <>
      <div
        draggable={false}
        ref={divRef}
        onMouseDown={handleMouseDown}
        onContextMenu={onRightClick}
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
          {showContext ?
            <ContextMenu dBPositions={dBPositions} closeContextMenu={closeContextMenu}/>
            :
            null
          }
        </div>
      </div>

    </>

  );
};

export default Imperator;
