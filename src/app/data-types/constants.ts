import Dice from "../components/Dice/Dice";
import { BsDice1, BsDice2, BsDice3, BsDice4, BsDice5, BsDice6 } from "react-icons/bs";
import { GiCrenulatedShield } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { GiBookmarklet } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";
import { GiTreasureMap } from "react-icons/gi";
import { GiEarthAfricaEurope } from "react-icons/gi";

export const INCREMENT = 1;
export const DECREMENT = -1;

export const SUCCESS = "Success";
export const FAIL = "Failure";

export const hexDropdownItems = [
    {id: 1, value: "A1"},
    {id: 2, value: "B1"},
    {id: 3, value: "C1"},
    {id: 4, value: "D1"},
    {id: 5, value: "E1"},
    {id: 6, value: "F1"},
    {id: 7, value: "G1"},
    {id: 8, value: "H1"},
    {id: 9, value: "I1"},
    {id: 10, value: "J1"},
    {id: 11, value: "K1"},
    {id: 12, value: "L1"},
    {id: 13, value: "M1"},
    {id: 14, value: "N1"},
    {id: 15, value: "O1"},
    {id: 16, value: "P1"},
    {id: 17, value: "Q1"},
    {id: 18, value: "R1"},
    {id: 19, value: "S1"},
    {id: 20, value: "T1"},
    {id: 21, value: "U1"},
    {id: 22, value: "V1"},
    {id: 23, value: "W1"},
    {id: 24, value: "X1"},
    {id: 25, value: "Y1"},
    {id: 26, value: "Z1"}
  ]

export const dicesArray: Dice[] = [
      { key: 1, value: BsDice1 },
      { key: 2, value: BsDice2 },
      { key: 3, value: BsDice3 },
      { key: 4, value: BsDice4 },
      { key: 5, value: BsDice5 },
      { key: 6, value: BsDice6 }
  ]


export const sidebarList = [
      { key: 1, value: GiTreasureMap, tooltip: 'Map'},
      { key: 2, value: GiEarthAfricaEurope, tooltip: 'World'},
      { key: 3, value: IoPeopleSharp, tooltip: 'Players'},
      { key: 4, value: GiCrenulatedShield, tooltip: 'Factions'},
      { key: 5, value: GiBookmarklet, tooltip: 'Rules'},
      { key: 6, value: TiThMenu, tooltip: 'Main menu'}
  ]

export const gameMenuList = ['New game', 'Load game', 'Rules',]