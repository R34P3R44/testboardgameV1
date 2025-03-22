import { useEffect, useRef, useState } from 'react';
import { sendPosition } from '../../../_restApiFn/send-position'
import ContextMenu from '../../Misc/ContextMenu';
import { EnemyPosition } from '@/app/data-types/characterType';
import '../movableObject.css';


type Positions = {
  x: number | null;
  y: number | null;
  dateTime: Date | null;
  charId: string | null
};


type EnemyProps = {
  enemyPositions: EnemyPosition[];
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
  mapRef: React.RefObject<HTMLDivElement>;
  currentEnemy: EnemyPosition;
  enemy: EnemyPosition
}

const Enemy: React.FC<EnemyProps> = ({ enemyPositions, isEndTurnClicked, resetTurnClick, mapRef, currentEnemy, enemy }) => {

  const divRef = useRef<HTMLDivElement | null>(null);
  const [newPosition, setNewPosition] = useState<Positions>({ x: 0, y: 0, dateTime: new Date(), charId: '' });
  // const [moveRangePosition, setMoveRangePosition] = useState<MoveRangePositions>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [enableMoving, setEnableMoving] = useState<boolean>(false)

  // useEffect(() => {
  //   if (enemyPositions[0]?.latestPositions?.x === null || enemyPositions[0]?.latestPositions?.y === null) {
  //     throw new Error("Invalid position: x or y is null.");
  //   }

  //   if (currentEnemy.latestPositions?.dateTime) {
  //     setNewPosition(enemyPositions.map((position) => ({
  //       x: position.latestPositions.x, 
  //       y: position.latestPositions.y, 
  //       dateTime: position.latestPositions.dateTime, 
  //       charId: position.charId 
  //     })));
  //   } 
    // else {
    //   setNewPosition({ x: 550, y: 400, dateTime: null, charId: enemyPositions[0]?.charId });
    // }
  // }, []);

  // useEffect(() => {
  //   if (isEndTurnClicked && newPosition.x !== null && newPosition.y !== null && newPosition.dateTime !== null) {
  //     sendPosition(newPosition)
  //     resetTurnClick()
  //   }
  // }, [isEndTurnClicked, newPosition]);

  // const handleMouseDown = (event: React.MouseEvent) => {
  //   event.preventDefault();

  //   if (!divRef.current && event.button !== 2) return;
  //   else if (!showContext && event.button === 0 && divRef.current && enableMoving && newPosition[0].x && newPosition[0].y) {
  //     const rect = divRef.current.getBoundingClientRect();

  //     const offsetX = (event.clientX - rect.left) / 2;
  //     const offsetY = (event.clientY - rect.top) / 2;

  //     const startX = event.clientX;
  //     const startY = event.clientY;
  //     const startLeft = newPosition[0].x;
  //     const startTop = newPosition[0].y;

  //     const handleMouseMove = (e: MouseEvent) => {
  //       if(startLeft && startTop && offsetX && offsetY ) {
  //         const position = {
  //           x: startLeft + (e.clientX - startX) - offsetX,
  //           y: startTop + (e.clientY - startY) - offsetY,
  //           dateTime: new Date(),
  //           charId: 'RoadKill1'
  //         };
  //         setNewPosition(position);
  //       }
  //     };

  //     const handleMouseUp = () => {
  //       document.removeEventListener("mousemove", handleMouseMove);
  //       document.removeEventListener("mouseup", handleMouseUp);
  //     };

  //     document.addEventListener("mousemove", handleMouseMove);
  //     document.addEventListener("mouseup", handleMouseUp);
  //   }
  // };


  const closeContextMenu = () => {
    setShowContext(false)
  }

  // const onClickMove = () => {
  //   setEnableMoving(true)
  //   setTimeout(() => setShowContext(false), 500)
  // }

  // const onClickLock = () => {
  //   setEnableMoving(false)
  // }

  const onRightClick = (e: React.MouseEvent) => {
    setIsDragging(false);
    if(e) {
      e.preventDefault();
      setShowContext(!showContext)
    }
  }

  // const getEnemyPicture = () => {
  //     if(enemy.category === "D1") {
  //       return '/Guard.png'
  //     }
  //     else if(enemy.category === "B1") {
  //       return '/Guard2.png' 
  //     }
  //     else {
  //       return '/Guard3.png'
  //     }
  // }

  return (
    <>
      <div
        draggable={false}
        className='enemyCharacter'
        ref={divRef}
        // onMouseDown={handleMouseDown}
        onContextMenu={onRightClick}
        style={{
          left: `${currentEnemy.latestPositions.x}px`,
          top: `${currentEnemy.latestPositions.y}px`,
        }}
      >
        {showContext ?
          <ContextMenu 
            enemyPositions={enemyPositions} 
            closeContextMenu={closeContextMenu} 
            // onClickMove={onClickMove} 
            // onClickLock={onClickLock} 
            enableMoving={enableMoving} 
            contextMenuType={"Enemy"}
          />
          :
          null
        }
      </div>
    </>

  );
};

export default Enemy;
