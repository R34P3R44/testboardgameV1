import { useEffect, useRef, useState } from 'react';
import './movableObject.css';
import { CharacterPosition, Positions } from "../../../app/data-types/characterType";
import { sendPosition } from '../../_restApiFn/send-position'
import ContextMenu from '../Misc/ContextMenu';
import Moverange from '../Moverange/Moverange';


type ImperatorProps = {
  dBPositions: CharacterPosition[];
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
  mapRef: React.RefObject<HTMLDivElement>
}

const Imperator: React.FC<ImperatorProps> = ({ dBPositions, isEndTurnClicked, resetTurnClick, mapRef }) => {

  const divRef = useRef<HTMLDivElement | null>(null);
  const [newPosition, setNewPosition] = useState<Positions>({ x: 0, y: 0, dateTime: new Date(), charId: '' });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [enableMoving, setEnableMoving] = useState<boolean>(false)
  const [showInventory, setShowInventory] = useState<boolean>(false)
  const [showCharMoveRange, setShowCharMoveRange] = useState<boolean>(false);


  useEffect(() => {
    if (dBPositions[0].latestPositions?.x === null || dBPositions[0].latestPositions?.y === null) {
      throw new Error("Invalid position: x or y is null.");
    }

    if (dBPositions[0].latestPositions?.dateTime) {
      setNewPosition({ x: dBPositions[0].latestPositions?.x, y: dBPositions[0].latestPositions?.y, dateTime: null, charId: dBPositions[0].charId });
    } else {
      setNewPosition({ x: 0, y: 0, dateTime: null, charId: dBPositions[0].charId });
    }
  }, []);

  useEffect(() => {
    if (isEndTurnClicked && newPosition.x !== null && newPosition.y !== null && newPosition.dateTime !== null) {
      sendPosition(newPosition)
      resetTurnClick()
    }
  }, [isEndTurnClicked, newPosition]);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!divRef.current && event.button !== 2) return;
    else if (!showContext && event.button === 0 && divRef.current && enableMoving && newPosition.x && newPosition.y) {
      const rect = divRef.current.getBoundingClientRect();

      const offsetX = (event.clientX - rect.left) / 2;
      const offsetY = (event.clientY - rect.top) / 2;

      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = newPosition.x;
      const startTop = newPosition.y;

      const handleMouseMove = (e: MouseEvent) => {
        const position = {
          x: startLeft + (e.clientX - startX) - offsetX,
          y: startTop + (e.clientY - startY) - offsetY,
          dateTime: new Date(),
          charId: 'RoadKill1'
        };
        setNewPosition(position);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const closeContextMenu = () => {
    setShowContext(false)
  }

  const onClickMove = () => {
    setEnableMoving(true)
    setTimeout(() => setShowContext(false), 500)
    setShowCharMoveRange(!showCharMoveRange)
  }

  const onClickLock = () => {
    setShowCharMoveRange(false)
    setEnableMoving(false)
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
        className='thiefCharacter'
        style={{
          left: `${newPosition.x}px`,
          top: `${newPosition.y}px`,
        }}
      >
        {showContext ?
          <ContextMenu 
            dBPositions={dBPositions} 
            closeContextMenu={closeContextMenu} 
            onClickMove={onClickMove} 
            onClickLock={onClickLock} 
            enableMoving={enableMoving} 
            setShowInventory={setShowInventory}
            showInventory={showInventory}
            contextMenuType={"Character"}
          />
          :
            null
        }
      </div>
      {/* {showCharMoveRange ? 
        <Moverange 
          newPosition={newPosition} 
          showCharMoveRange={showCharMoveRange} 
          contextMenuType={"Character"}
        /> 
        : 
          null
      } */}
    </>

  );
};

export default Imperator;
