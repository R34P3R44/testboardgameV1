import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { ItemAttributes } from "../../app/data-types/characterType";

type Data = {
    id?: string;
    error?: string;
    success?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method === "PATCH"){
        const {charId, itemData} = req.body
        
        if(!charId || !(itemData && typeof itemData === "object")){
            return res.status(400).json({error: "Invalid request data"})
        }
        try {
            const charCollection = collection(db, "character-inventory");
            const q = query(charCollection);
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty){
                return res.status(400).json({error: "Character not found"})
            }
            const docId = querySnapshot.docs[0].id;
            const docRef = doc(db, "character-inventory", docId);
            await updateDoc(docRef, { inventoryItems: itemData });
            res.status(200).json({success: true})
        }
        catch (error) {
            console.log('Error updating inventory', error)
            res.status(500).json({ error: "Failed to update inventory" }); 
        }
    }
    else {
        res.setHeader("Allow", ["PATCH"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);   
    }





}