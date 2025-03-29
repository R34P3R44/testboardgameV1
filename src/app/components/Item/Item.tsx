import React, { useState } from "react";
import { ItemAttributes } from "@/app/data-types/characterType";
import Image from "next/image";
import ContextMenu from "../Misc/ContextMenu";
import { updateCharacterInventory } from "@/app/_restApiFn/send-updateCharacterInventory";
import { useCharacterInventory } from "@/app/Store/useCharacterInventory";
import { useMapItems } from '@/app/Store/useMapItems';
import '../characters/movableObject.css';


interface ItemProps {
  currentItem: ItemAttributes | null;
  charId: string;
}

const Item: React.FC<ItemProps> = ({ currentItem, charId }) => {
  const [showContext, setShowContext] = useState<boolean>(false);
  const { characterInventory, setCharacterInventory } = useCharacterInventory();
  const { mapItems, setMapItems } = useMapItems();


  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContext(!showContext);
  };

  const closeContextMenu = () => {
    setShowContext(false);
  };

  const onClickPickup = async (indexId: number) => {
    console.log(indexId)
    if (!currentItem) return;

    const itemToAddInventory = mapItems.find((item: ItemAttributes) => item.id === indexId)
    if (!itemToAddInventory) return;

    setCharacterInventory([...characterInventory, itemToAddInventory]);

    const newMapItems = mapItems.filter((item: ItemAttributes) => item.id !== indexId);
    if (!newMapItems) return;

    setMapItems(newMapItems)

    setShowContext(false)
  };

  return (
    <div
      className="mapItem"
      onContextMenu={onRightClick}
      key={currentItem?.id}
      style={{
        left: `${currentItem?.itemData.positionX}px`,
        top: `${currentItem?.itemData.positionY}px`,
      }}
    >
      {showContext && (
        <div className="relative right-2 bottom-5">
          <ContextMenu
            indexId={currentItem?.id}
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
