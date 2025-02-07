export const updateCharacterWounds = async (charId: string, wounds: number): Promise<any> => {
    try{
        const response = await fetch("/api/update-char-wounds", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({charId, wounds}),
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
    } catch (error) {
        console.error("Error updating character wounds:", error);
    }
}