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