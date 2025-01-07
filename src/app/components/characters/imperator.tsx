import { useEffect, useRef, useState } from 'react';
import './movableObject.css';
import Ably from 'ably';
// import { Position } from "../../app/data-types/characterType";
import { CharacterPosition } from "../../../app/data-types/characterType";
import { sendPosition } from '../../_restApiFn/send-position'
import ContextMenu from '../ContextMenu'

type Positions = {
  x: number | null;
  y: number | null;
  dateTime: Date | null
};

type MoveRangePositions = {
  x: number | null;
  y: number | null;
};

type ImperatorProps = {
  dBPositions: CharacterPosition[];
  isEndTurnClicked: boolean;
  resetTurnClick(): void;
}

const Imperator: React.FC<ImperatorProps> = ({ dBPositions, isEndTurnClicked, resetTurnClick }) => {

  const divRef = useRef<HTMLDivElement | null>(null);
  const throttledPosition = useRef<Positions | null>(null);
  const [newPosition, setNewPosition] = useState<Positions>({ x: 0, y: 0, dateTime: new Date(), });
  const [moveRangePosition, setMoveRangePosition] = useState<MoveRangePositions>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [channel, setChannel] = useState<any>(null);

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
    if (isEndTurnClicked) {
      const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
      const testChannel = ably.channels.get('test-channel');
      setChannel(testChannel);
  
      ably.connection.on('connected', () => console.log('Ably connected'));
      ably.connection.on('failed', (state) => console.error('Ably connection failed:', state));
    }
  }, [isEndTurnClicked]);


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
    if (isEndTurnClicked 
      && channel && newPosition.x !== null && newPosition.y !== null && newPosition.dateTime !== null
    
    ) {
      console.log("Effect: 3")

      sendPosition(newPosition)
      console.log("Sending position")

      if (!throttledPosition.current || (throttledPosition.current.dateTime !== null ? Date.now() - throttledPosition.current.dateTime.getTime() > 100 : null)) {
        throttledPosition.current = { ...newPosition, dateTime: new Date() };
        channel.publish('position-update', throttledPosition.current);
      }
      resetTurnClick()
    }
  }, [isEndTurnClicked, 
      newPosition, 
      channel
    ]);

    useEffect(() => {
      if (isEndTurnClicked && channel) {
        console.log("Effect: 4 - Subscribing to position updates");
    
        const handlePositionUpdate = (message: Ably.Message) => {
          const position = message.data as Positions;
          console.log("Received position update:", position);
    
          if (position.x !== null && position.y !== null) {
            setNewPosition(position);
          }
        };
    
        channel.subscribe('position-update', handlePositionUpdate);
    
        return () => {
          console.log("Effect: 4 - Unsubscribing from position updates");
          channel.unsubscribe('position-update', handlePositionUpdate);
        };
      }
    }, [isEndTurnClicked, channel]);

  // useEffect(() => {
  //   if(channel && isEndTurnClicked){
  //     console.log("Effect: 5")
  //     const onConnectionStateChange = (stateChange: Ably.ConnectionStateChange) => {
  //       console.log("Connection state changed:", stateChange.current)
  //     }
  //       channel.connection.on(onConnectionStateChange);
  //     return () => {
  //       channel.connection.off(onConnectionStateChange);
  //     }  
  //   }
  // }, [
  //     channel, 
  //     isEndTurnClicked
  //   ]);

    useEffect(() => {
      if (isEndTurnClicked) {
        const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
        setChannel(ably.channels.get('test-channel'));
    
        const onConnectionStateChange = (stateChange: Ably.ConnectionStateChange) => {
          console.log("Connection state changed:", stateChange.current);
        };
    
        ably.connection.on(onConnectionStateChange);
    
        return () => {
          ably.connection.off(onConnectionStateChange);
        };
      }
    }, [isEndTurnClicked]);

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
          {showContext && moveRangePosition ?
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
