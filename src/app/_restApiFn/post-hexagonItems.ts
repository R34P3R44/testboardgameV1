export const postHexagonItems = async (mapId: string, itemData: object): Promise<any> => {
    try{
        const response = await fetch("/api/post-hex-layer-positions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({mapId, itemData}),
        });

        if(response.ok){
            console.log(response, "RESPONSE")
            const data = await response.json();
            return await data;
        }
        else {
            console.log(response, "ERROR RESPONSE")
            const errorData = await response.json();
            return await errorData;
        }
    }
    catch (error) {
        console.error("Error adding items:", error);
    }
}