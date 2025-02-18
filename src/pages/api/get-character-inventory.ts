import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { InventoryAttributes } from "@/app/data-types/characterType";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET"){
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
        const querySnapshot = await getDocs(collection(db, "character-inventory"));
        if(querySnapshot.empty){
            return res.status(404).json({error: "No character inventory found"})
        }

        const inventory: InventoryAttributes[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                itemData: {
                    id: data.id ?? null,
                    visible: data.visible ?? null,
                    type: data.type ?? null,
                    item: data.item ?? null,
                    description: data.description ?? null,
                    weight: data.weight ?? null,
                    qty: data.qty ?? null,
                    isJunk: data.isJunk ?? null,
                    positionX: data.positionX ?? null,
                    positionY: data.positionY ?? null,
                    },
                charId: data.charId ?? null,    
            };
        });
        res.status(200).json(inventory)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error retrieving inventory"})
    }

}