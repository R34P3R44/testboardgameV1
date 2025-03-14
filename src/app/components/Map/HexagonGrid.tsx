import React, { useState, useEffect, useRef } from "react";
import "./Hexagon.css";
import { hexDropdownItems } from "@/app/data-types/constants";
import { useHexagonItems } from "@/app/Store/useHexagonItems";


const HoneycombGrid: React.FC = ({}) => {
  const [gridSize, setGridSize] = useState({ hexPerRow: 0, hexPerColumn: 0, });
  const {hexagonItems, setHexagonItems} = useHexagonItems();

  useEffect(() => {
    const calculateGrid = () => {
      const hexSize = 72; 
      const hexHeight = hexSize * 1.1547;
      const gap = 1;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const hexPerRow = (Math.floor((screenWidth / (hexSize + gap)) * 2)) / 3;
      const hexPerColumn = (Math.floor((screenHeight / (hexHeight * 0.75 + gap)) * 2)) * 2;

      setGridSize({ hexPerRow, hexPerColumn });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);


  const onSelectItem = (e: any,) => {
    const hexagon = e.target.closest(".hex-icon");
    if (!hexagon) return;
    const hexagonCoordinates = hexagon.getBoundingClientRect()
    const item = {
      x: hexagonCoordinates.left + window.scrollX + hexagonCoordinates.width / 51, //horizontal
      y: hexagonCoordinates.top + window.scrollY - hexagonCoordinates.height / 18,
      selectedType: e.target.value, 
    }
    setHexagonItems([...hexagonItems, item])
  }


  return (
    <div className="main321">
      <div className="container123">
        {Array.from({ length: gridSize.hexPerColumn }).map((_, rowIndex) => (
          <div key={rowIndex} className="hex-row">
            {Array.from({ length: gridSize.hexPerRow }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`hexContainer ${rowIndex % 2 !== 0 ? "offset" : ""}`}>
                <div data-id={`${rowIndex}-${colIndex}`} className={"hex-icon hover:opacity-80 hover:cursor-pointer bg-white"}>
                  <select defaultValue='' onChange={(e) => onSelectItem(e,)} className="bg-transparent  rounded-md w-14 font-extrabold text-xl text-black uppercase rotate-[-90deg] absolute right-4 hover:cursor-pointer hover:bg-gray-200">
                    <option>{""}</option>
                    {hexDropdownItems.map((item) => (
                      <option key={item.id}>{item.value}</option>
                    ))}
                  </select>
                  </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoneycombGrid;