import { ComponentType } from 'react';

export interface Position {
  x: number;
  y: number;
  dateTime: string;
  charId: string
};

export interface ActiveStatus {
  charId: string;
  active: boolean;
}

export interface FactionsData {
  id: number;
  active: boolean;
  charId: string;
  description: string;
}

export type CharacterPosition = {
  charId: string;
  active: boolean;
  latestPositions: {
    x: number;
    y: number;
    dateTime: string;
  };
};

export type EnemyPosition = {
  id: number,
  charId: string;
  active: boolean;
  category: string;
  latestPositions: {
    x: number;
    y: number;
    dateTime: string;
  };
};

export type CharacterAttributes = {
  charId: string;
  move: number;
  attack: number;
  defend: number;
  wounds: number
}

export type AlertTypes = {
  success: boolean;
  fail: boolean;
}

export type CharacterTurn = {
  enemy: boolean;
  friendly: boolean;
  className: string;
}

export type Dice = {
  key: number;
  value: ComponentType<{ size: number }>;
}

export type SideMenuItems = {
  key: number;
  value: ComponentType<{ size: number }>;
  tooltip: string
}


export type ItemAttributes = {
  id: number;
  charId: string;
  itemData: {
    visible: boolean;
    type: string;
    item: string;
    description: string;
    weight: number;
    qty: number;
    isJunk: boolean;
    positionX: number;
    positionY: number;
  }
}

export type MoveRangePositions = {
  x: number | null;
  y: number | null;
};

export type Positions = {
  x: number;
  y: number;
  dateTime: Date | null;
  charId: string | null
};

export type SideBarPosition = {
  x: number;
  y: number;
}

export type GameMenuNav = string | null

export type SideMenuNav = string