import React, { useState } from "react";
import { ItemAttributes } from "@/app/data-types/characterType";
import Image from "next/image";
import ContextMenu from "../Misc/ContextMenu";
import { updateCharacterInventory } from "@/app/_restApiFn/send-updateCharacterInventory";
import { useCharacterInventory } from "@/app/Store/useCharacterInventory";

interface ItemProps {
  currentItem: ItemAttributes | null;
  charId: string;
  indexId: string
}

const Item: React.FC<ItemProps> = ({ currentItem, charId, indexId }) => {
  const [showContext, setShowContext] = useState<boolean>(false);
  const { characterInventory, setCharacterInventory } = useCharacterInventory();

  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContext(!showContext);
  };

  const closeContextMenu = () => {
    setShowContext(false);
  };

const onClickPickup = async () => {
    if (!currentItem) return;

    const newCurrentItem = {
      id: currentItem.id,
      charId: charId,
      itemData: {
        visible: false,
        type: currentItem.itemData.type,
        item: currentItem.itemData.item,
        description: currentItem.itemData.description,
        weight: currentItem.itemData.weight,
        qty: currentItem.itemData.qty,
        isJunk: currentItem.itemData.isJunk,
        positionX: 0,
        positionY: 0,
      }
    }
  
    const updatedInventory = [...characterInventory, newCurrentItem];
    setCharacterInventory(updatedInventory);
    setShowContext(false)    
  };

  return (
    <div
      onContextMenu={onRightClick}
      key={indexId}
      style={{
        position: "absolute",
        left: `${currentItem?.itemData.positionX}px`,
        top: `${currentItem?.itemData.positionY}px`,
        cursor: "pointer",
        zIndex: 40,
      }}
    >
      <Image
        src={"/bag-of-coins-upscaled-noback2.png"}
        alt={`${currentItem?.itemData.description}`}
        height={40}
        width={40}
      />
      {showContext && (
        <div className="z-50 relative right-2 bottom-5">
          <ContextMenu
            indexId={indexId}
            contextMenuType={"Item"}
            closeContextMenu={closeContextMenu}
            onClickPickup={onClickPickup}
            currentItem={currentItem || undefined}
          />
        </div>
      )}
    </div>
  );
};

export default Item;
