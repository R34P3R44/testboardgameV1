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
      x: number | null;
      y: number | null;
      dateTime: string | null;
    } | null;
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
    value: ComponentType<{ size: number; className?: string }>;
  }

  export type SideMenuItems = {
    key: number;
    value: ComponentType<{ size: number}>;
    tooltip: string
  }