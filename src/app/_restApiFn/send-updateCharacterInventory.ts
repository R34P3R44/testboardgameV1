export const updateCharacterInventory = async (charId: string, item: object): Promise<any> => {
    try{
        const response = await fetch("api/update-character-inventory", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({charId, item}),
        });

        if(response.ok){
            console.log(response, "RESPONSE")
            const data = await response.json();
            return await data;
        } else {
            console.log(response, "ERROR RESP")
            const errorData = await response.json();
            return await errorData;
        }
    } catch (error){
        console.error("Error updating character inventory:", error);
    }
}