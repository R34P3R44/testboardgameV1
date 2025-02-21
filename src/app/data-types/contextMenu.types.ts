import { CharacterPosition, ItemAttributes } from "./characterType";


export type ContextMenuBaseTypes = {
    closeContextMenu?: () => void;
    contextMenuType?: string;
    indexId?: string;
}

export type ContextMenuCharTypes = {
    dBPositions?: CharacterPosition[];
    onClickMove?: () => void;
    onClickLock?: () => void;
    enableMoving?: boolean;
    setShowInventory?: (value: boolean) => void;
    showInventory?: boolean;
}

export type ContextMenuItemTypes = {
    onClickPickup?: () => void;
    currentItem?: ItemAttributes; 
}

export type ContextMenuProps = ContextMenuBaseTypes & ContextMenuCharTypes & ContextMenuItemTypes;