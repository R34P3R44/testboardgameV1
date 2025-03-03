import React, { useEffect, useState } from "react";
import { GiAxeSword } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import { GiCoins } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { GiCrossbow } from "react-icons/gi";
import { GiBeerBottle } from "react-icons/gi";
import { GiBandageRoll } from "react-icons/gi";
import { DiRuby } from "react-icons/di";
import { ItemAttributes } from "@/app/data-types/characterType";
import { ImBin2 } from "react-icons/im";
import sumBy from "lodash/sumBy";
import { useCharacterInventory } from "@/app/Store/useCharacterInventory";
import Spinner from '../Misc/Spinner';


interface InventoryTableProps {
  inventoryItems: ItemAttributes[] | null;
  onRemoveItem: (value: ItemAttributes) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventoryItems, onRemoveItem }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentInventoryItems, setCurrentInventoryItems] = useState<ItemAttributes[]>([]);
  const { characterInventory, setCharacterInventory } = useCharacterInventory();
  

  useEffect(() => {
    if (characterInventory.length !== currentInventoryItems.length) {
      setLoading(true)
      let invItems = [];
      invItems = characterInventory.map((item, index) => item);
      setCurrentInventoryItems(invItems)
      setLoading(false)
    }
  }, [characterInventory]);

  const itemTypeIcons = [
    { key: 1, value: GiAxeSword, type: "CCW" },
    { key: 2, value: GiCheckedShield, type: "HA" },
    { key: 3, value: GiCoins, type: "Currency" },
    { key: 4, value: TbMeat, type: "Food" },
    { key: 5, value: GiCrossbow, type: "LRW" },
    { key: 6, value: GiBeerBottle, type: "Drink" },
    { key: 7, value: GiBandageRoll, type: "FA" },
    { key: 8, value: DiRuby, type: "Gemstone" },
  ]

  const getItemIcon = (item: ItemAttributes) => {
    const icon = itemTypeIcons.find((icon) => icon.type === item.itemData.type);
    return icon ? React.createElement(icon.value, { size: 30 }) : null;
  }

  return (
    <>
      {loading ? 
      <>
        <Spinner/>
      </>
        :
        null

      }
      <>
        {currentInventoryItems && currentInventoryItems.length ?
          <table className="table">
            <thead >
              <tr className='border-1 border-slate-900'>
                <th className='w-5'>Type</th>
                <th className='w-auto'>Item</th>
                <th className='w-auto'>Description</th>
                <th className='w-auto'>{`Weight (
              ${sumBy(currentInventoryItems || [], item => item.itemData.weight).toFixed(1)}kg)`}</th>
                <th className='w-5'>Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(currentInventoryItems ?? []).map((item, index) => (
                <tr key={`inventory-item-${item.id}`} className='w-auto border-1 border-slate-900'>
                  <td className='border-1 border-slate-900'>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle">
                          {getItemIcon(item)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.itemData.item}
                  </td>
                  <td>
                    {item.itemData.description}
                  </td>
                  <td>
                    {`${item.itemData.weight} kg`}
                  </td>
                  <td>
                    {item.itemData.qty === 0 ? 0 : item.itemData.qty}
                  </td>
                  <td>
                    <button onClick={() => onRemoveItem(item)}><ImBin2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <table className="table">
            <tbody>
              <tr className="flex justify-center">
                <td>{"NO ITEMS"}</td>
              </tr>
            </tbody>
          </table>
        }
      </>

    </>

  )
};

export default InventoryTable;