export const sendPosition = async (newPosition: object = {}) => {
    try {
        const response = await fetch("/api/save-position", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPosition),
        });
        if (response.ok) {
          const data = await response.json();
        } else {
          const errorData = await response.json();
          console.log("Error adding character position")
        }
      } 
      catch (error) {
        console.log(error)
        console.log("Error adding character position")
      }
}