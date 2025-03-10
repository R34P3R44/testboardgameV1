import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";

type Data = {
    id?: string;
    error?: string;
    success?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){

    if(req.method === "POST"){
        const {mapId, itemData} = req.body

        if(!mapId || !(itemData && typeof itemData === "object")){
            return res.status(400).json({error: "Invalid request data"})
        }
        try {
            const hexLayerCollection = collection(db, "hex-layer-positions");
            const q = query(hexLayerCollection);
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty){
                return res.status(400).json({error: "Map not found"})
            }
            const docId = querySnapshot.docs[0].id;
            const docRef = doc(db, "hex-layer-positions", docId);
            await updateDoc(docRef, {mapId, positions: itemData});
            res.status(200).json({success: true})
        }
        catch (error) {
            console.log('Error adding items', error)
            res.status(500).json({ error: "Failed to add items" }); 
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);   
    }







}