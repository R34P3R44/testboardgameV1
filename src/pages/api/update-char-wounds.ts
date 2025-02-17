import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { CharacterAttributes } from "../../app/data-types/characterType";

type Data = {
  id?: string;
  error?: string;
  success?: boolean
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method === "PATCH"){
        const {charId, wounds} = req.body as CharacterAttributes

        if(!charId || typeof wounds !== "number"){
            return res.status(400).json({error: "Invalid request data"});
        }

        try{
            const characterCollection = collection(db, "character-attributes");
            const q = query(characterCollection, where("charId", "==", charId));
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty){
                return res.status(400).json({error: "Character not found"})
            }

            const docId = querySnapshot.docs[0].id;
            const docRef = doc(db, "character-attributes", docId);

            await updateDoc(docRef, {wounds});

            res.status(200).json({success: true});
        } catch (error) {
            console.log('Error updating character', error)
            res.status(500).json({ error: "Failed to update character" });      
        }
    } else {
        res.setHeader("Allow", ["PATCH"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);    
    }
}