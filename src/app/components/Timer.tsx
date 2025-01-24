// "use client"; // This directive makes the component a client component


// type TimerProps = {
//   checkPlayerTime(result: string): void
// }

// import React, { useState, useEffect } from 'react';


// const Timer: React.FC<TimerProps> = ({checkPlayerTime}) => {

//   const [interval, setInterval] = useState<string>('')

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       const date = new Date();
//       const seconds = date.getMinutes() * 60 + date.getSeconds();
//       const fiveMins = 300;
//       const timeLeft = fiveMins - seconds % fiveMins;
//       const convertedTimeLeft = timeLeft / 60
//       const result = Math.floor(convertedTimeLeft) + ':' + timeLeft % 60
      
//       setInterval(result)
//     }, 1000);
//     return () => {
//       window.clearInterval(timer);
//     };
//   }, []);

//   const sendInterval = () => {
//     checkPlayerTime(interval)
//     return interval
//   }


//   return (
//     <div className="w-24 flex text-black justify-center ">
//       <div className='animate-bounce'>{sendInterval()}</div> 
//     </div>
//   );
// };

// export default Timer;