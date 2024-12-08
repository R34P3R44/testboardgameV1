
export const updateCharacters = async (charId: string, active: boolean): Promise<void> => {
    try {
      const response = await fetch("/api/update-character", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ charId, active }), // Send charId and active
      });
  
      if (response.ok) {
        console.log(response, "RESPONSE")
        const data = await response.json();
        console.log("Character updated successfully:", data);
      } else {
        console.log(response, "ERROR RESP")
        const errorData = await response.json();
        console.error("Error updating character:", errorData.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };