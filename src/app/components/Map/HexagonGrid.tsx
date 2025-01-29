// import React, { useState, useEffect } from "react";
// import "./Hexagon.css";
// import { PiHexagonThin } from "react-icons/pi";

// const HoneycombGrid: React.FC = () => {
//   const [gridSize, setGridSize] = useState({ hexPerRow: 0, hexPerColumn: 0 });

//   useEffect(() => {
//     const calculateGrid = () => {
//       const hexWidth = 100; // Same as --hex-size in CSS
//       const hexHeight = hexWidth * 1.1547; // Approx height
//       const gap = 1;

//       const screenWidth = window.innerWidth;
//       const screenHeight = window.innerHeight;

//       const hexPerRow = Math.floor(screenWidth / (hexWidth + gap));
//       const hexPerColumn = Math.floor(screenHeight / (hexHeight * 0.75 + gap));

//       setGridSize({ hexPerRow, hexPerColumn });
//     };

//     calculateGrid();
//     window.addEventListener("resize", calculateGrid);
//     return () => window.removeEventListener("resize", calculateGrid);
//   }, []);

//   const totalHexagons = gridSize.hexPerRow * gridSize.hexPerColumn;
//   const hexGrids = Array.from({ length: totalHexagons });

//   return (
//     <div className="main321">
//       <div className="container123">
//         {hexGrids.map((_, index) => (
//           <div key={index}>
//             <PiHexagonThin color="#00bfff" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HoneycombGrid;

import React, { useState, useEffect } from "react";
import "./Hexagon.css";
import { PiHexagonThin } from "react-icons/pi";

const HoneycombGrid: React.FC = () => {
  const [gridSize, setGridSize] = useState({ hexPerRow: 0, hexPerColumn: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      const hexSize = 100; // Matches --s in CSS
      const hexHeight = hexSize * 1.1547;
      const gap = 1;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const hexPerRow = Math.floor((screenWidth / (hexSize + gap)) * 2);
      const hexPerColumn = Math.floor((screenHeight / (hexHeight * 0.75 + gap)) * 2);

      setGridSize({ hexPerRow, hexPerColumn });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  return (
    <div className="main321">
      <div className="container123">
        {Array.from({ length: gridSize.hexPerColumn }).map((_, rowIndex) => (
          <div key={rowIndex} className="hex-row">
            {Array.from({ length: gridSize.hexPerRow }).map((_, colIndex) => (
              <PiHexagonThin
                key={colIndex}
                className={`hex-icon ${rowIndex % 2 !== 0 ? "offset" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoneycombGrid;