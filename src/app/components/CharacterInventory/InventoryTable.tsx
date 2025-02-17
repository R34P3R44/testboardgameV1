import React from "react";
import { GiAxeSword } from "react-icons/gi";
import { GiCheckedShield } from "react-icons/gi";
import { GiCoins } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { ImBin2 } from "react-icons/im";
import { GiCrossbow } from "react-icons/gi";
import { GiBeerBottle } from "react-icons/gi";
import { GiBandageRoll } from "react-icons/gi";
import { DiRuby } from "react-icons/di";
import { InventoryAttributes } from '../../data-types/characterType';


interface InventoryTableProps {
  inventory: InventoryAttributes | null
}

const InventoryTable: React.FC<InventoryTableProps> = ({inventory}) => {
  return (
    <table className="table">
      <thead >
        <tr className='border-1 border-slate-900'>
          <th className='w-5'>Type</th>
          <th className='w-auto'>Item</th>
          <th className='w-auto'>Description</th>
          <th className='w-auto'>Weight (11.3 kg)</th>
          <th className='w-5'>Qty</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr className='w-auto border-1 border-slate-900'>
          <td className='border-1 border-slate-900'>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <GiAxeSword size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Lond sword
          </td>
          <td>
            Double handed sword, good for massive strikes
          </td>
          <td>
            2.7 kg
          </td>
          <td>
            1
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>
        <tr className='w-auto border-1 border-slate-900'>
          <td className='border-1 border-slate-900'>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <GiCrossbow size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Crossbow
          </td>
          <td>
            A short-range weapon that shoots bolts
          </td>
          <td>
            4.3 kg
          </td>
          <td>
            1
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>

        <tr className='w-auto border-1 border-slate-900'>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <GiCheckedShield size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Shield
          </td>
          <td>
            Rohan shield, good for blocking strikes
          </td>
          <td>
            2.4 kg
          </td>
          <td>
            1
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>

        </tr>
        <tr className='w-auto border-1 border-slate-900'>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle ">
                  <GiCoins size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Coins
          </td>
          <td>
            Gold coins
          </td>
          <td>
            0.2 kg
          </td>
          <td>
            20
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>
        <tr className='w-auto border-1 border-slate-900'>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <TbMeat size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Pork meat
          </td>
          <td>
            Can be used to heal wounds or restore stamina
          </td>
          <td>
            1.1 kg
          </td>
          <td>
            1
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>
        <tr className='w-auto border-1 border-slate-900'>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <GiBeerBottle size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Mead
          </td>
          <td>
            A honey based alcoholic drink
          </td>
          <td>
            0.7 kg
          </td>
          <td>
            4
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>
        <tr className='w-auto border-1 border-slate-900'>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <GiBandageRoll size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Bandage
          </td>
          <td>
            A cloth roll to treat wounds
          </td>
          <td>
            0.1 kg
          </td>
          <td>
            2
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>
        <tr className='w-auto border-1 border-slate-900'>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle">
                  <DiRuby size={30} />
                </div>
              </div>
            </div>
          </td>
          <td>
            Gem stone
          </td>
          <td>
            A precious piece of stone, can be sold to traders
          </td>
          <td>
            0.4 kg
          </td>
          <td>
            1
          </td>
          <td>
            <button><ImBin2 /></button>
          </td>
        </tr>




      </tbody>
    </table>

  )
};

export default InventoryTable;