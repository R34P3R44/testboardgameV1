import { CharacterPosition, ItemAttributes, EnemyPosition } from "./characterType";


export type ContextMenuBaseTypes = {
    closeContextMenu?: () => void;
    contextMenuType?: string;
    indexId?: number;
}

export type ContextMenuCharTypes = {
    dBPositions?: CharacterPosition[];
    enemyPositions?: EnemyPosition[];
    onClickMove?: () => void;
    onClickLock?: () => void;
    enableMoving?: boolean;
    setShowInventory?: (value: boolean) => void;
    showInventory?: boolean;
}

export type ContextMenuItemTypes = {
    onClickPickup?: (value: number) => void;
    currentItem?: ItemAttributes; 
}

export type ContextMenuProps = ContextMenuBaseTypes & ContextMenuCharTypes & ContextMenuItemTypes;