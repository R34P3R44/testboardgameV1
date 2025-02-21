import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ItemAttributes } from "@/app/data-types/characterType"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const querySnapshot = await getDocs(collection(db, "character-inventory"));
        if (querySnapshot.empty) {
            return res.status(404).json({ error: "No character inventory found" });
        }    

        const inventory: ItemAttributes[] = querySnapshot.docs.flatMap((doc) => {
            const data = doc.data();
            const inventoryItems = data.inventoryItems || []; 
            return inventoryItems.map((item: ItemAttributes) => ({
                charId: data.charId, 
                id: item.id, 
                itemData: {
                    visible: item.itemData.visible,
                    type: item.itemData.type,
                    item: item.itemData.item,
                    description: item.itemData.description,
                    weight: item.itemData.weight,
                    qty: item.itemData.qty,
                    isJunk: item.itemData.isJunk,
                    positionX: item.itemData.positionX,
                    positionY: item.itemData.positionY,
                }
            }));
        });
        res.status(200).json(inventory); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error retrieving inventory" });
    }
}