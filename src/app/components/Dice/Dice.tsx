import React from "react";
import { CharacterTurn } from '@/app/data-types/characterType';
import type { Dice } from "@/app/data-types/characterType";
import { BsDice1 } from "react-icons/bs";
import './Dice.css'


interface DiceProps {
    dice: CharacterTurn;
    currentDiceNumber: Dice | null
    isRolling: boolean
}

const Dice: React.FC<DiceProps> = ({ dice, currentDiceNumber, isRolling }) => {

    return (
        <>
            <div className={isRolling ? "text-white animate-roll-x" : "text-white "}>
                {React.createElement(currentDiceNumber?.value ?? BsDice1, {
                    size: 50,
                    className: dice.className
                })}
            </div>
            {/* {currentDiceNumber && dice.friendly ? (
                <div className="text-white ">
                    {React.createElement(currentDiceNumber.value, {
                        size: 50,
                        className: dice.className
                    })}
                </div>)
                :
                null
            } */}
        </>
    )
};

export default Dice;