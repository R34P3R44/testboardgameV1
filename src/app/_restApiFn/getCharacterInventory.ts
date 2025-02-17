export const getCharacterInventory = async (charId: string) => {
    try {
        const response = await fetch(`/api/get-character-inventory?char=${encodeURIComponent(charId)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(!response.ok){
            const errorData = await response.json();
            console.log("Error getting character attributes")
            return {error: errorData}
        }
        return await response.json();
    }
    catch (error){
        console.error("Error getting character attributes:", error);
        return { error: "Failed to fetch character attributes." };
    }
}