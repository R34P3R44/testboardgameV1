"use client";

import React, { useState} from 'react';

interface MoverangePropps {
    moveRangePosition : {
        x: number | null,
        y: number | null
    }
}

type MoveRangePositions = {
    x: number | null;
    y: number | null;
  };

const Moverange: React.FC<MoverangePropps> = ({moveRangePosition}) => { 

    


  return (
    <div className='animate-pulse bg-green-600 w-40 h-40 rounded-full z-30'
    style={{
      position: 'relative',
      left: `${moveRangePosition.x}px`,
      top: `${moveRangePosition.y}px`,
    }}
>
</div>
)
};

export default Moverange;