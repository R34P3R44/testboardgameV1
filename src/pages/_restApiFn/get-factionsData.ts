// export const getFactionsData = async (newPosition: object = {}) => {
//     try {
//         const response = await fetch("/api/characters", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newPosition),
//         });
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data)
//         } else {
//           const errorData = await response.json();
//           console.log(errorData)
//           console.log("Error adding character position")
//         }
//       } catch (error) {
//         console.log(error)
//         console.log("Error adding character position")
//       }
// }