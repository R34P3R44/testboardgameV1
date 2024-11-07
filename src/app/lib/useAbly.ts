// import { useState, useEffect } from 'react';
// import Ably from 'ably';

// type Message = {
//   name: any;
//   text: any;
//   x?: number;
//   y?: number;
// };

// type Position = {
//     x: number;
//     y: number;
//   };

// let ablyClient: Ably.Realtime | null = null;

// export const useAbly = (channelName: string) => {
//     const [messages, setMessages] = useState<Message[]>([]);
  
//     useEffect(() => {
//       if (!ablyClient) {
//         ablyClient = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
//       }
  
//       const channel = ablyClient.channels.get(channelName);
  
//       const handleMessage = (msg: Ably.Message) => {
//         const messageData = msg.data as Message;
//         setMessages((prevMessages) => [...prevMessages, messageData]);
//       };
  
//       channel.subscribe('chat-message', handleMessage);
  
//       return () => {
//         channel.unsubscribe('chat-message', handleMessage);
//         channel.detach();
//       };
//     }, [channelName]);
  
//     const sendMessage = (name: string, text: string = '', position?: Position) => {
//       if (!ablyClient) return;
//       const channel = ablyClient.channels.get(channelName);
//       const messageData = { name, text, ...position };
//       channel.publish('chat-message', messageData);
//     };
  
//     return { messages, sendMessage };
//   };

// // export const useAblyAragorn = (channelName: string) => {
// //     const [charMoves, setCharMoves] = useState<Message[]>([]);
  
// //     useEffect(() => {
// //       if (!ablyClient) {
// //         ablyClient = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
// //       }
  
// //       const channel = ablyClient.channels.get(channelName);
  
// //       const handleCharmoves = (mv: Ably.Message) => {
// //         const movesData = mv.data as Message;
// //         setCharMoves((prevCharMoves) => [...prevCharMoves, movesData]);
// //       };
  
// //       channel.subscribe('aragorn-moves', handleCharmoves);
  
// //       return () => {
// //         channel.unsubscribe('chat-message', handleCharmoves);
// //         channel.detach();
// //       };
// //     }, [channelName]);
  
// //     const sendMoves = (move: any, position: any) => {
// //       if (!ablyClient) return;
// //       const channel = ablyClient.channels.get(channelName);
// //       channel.publish('aragorn-moves', { move, position });
// //     };
  
// //     return { charMoves, sendMoves };
// //   };
  