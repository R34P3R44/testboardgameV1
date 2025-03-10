export const getHexLayerEnemies = async(mapId: string) => {
    try {
        const response = await fetch(`/api/get-hexLayer-enemies?mapId=${encodeURIComponent(mapId)}`, {
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
    catch(error){
        console.error("Error getting data:", error);
        return { error: "Failed to fetch data." };
    }
}