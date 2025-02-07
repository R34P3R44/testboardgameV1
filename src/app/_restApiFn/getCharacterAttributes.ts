export const getCharacterAttributes = async (charAttributes: string = "") => {
    try {
        const response = await  fetch("/api/get-character-attributes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok) {
            const data = await response.json();
            return data
        }
        else {
            const errorData = await response.json();
            console.log("Error getting character attributes")
            return errorData
        }
    } 
    catch (error) {
        console.log(error)
        console.log("Error getting character attributes")
    }
}