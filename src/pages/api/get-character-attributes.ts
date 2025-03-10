import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CharacterAttributes } from "../../app/data-types/characterType";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET"){
        try {
            const querySnapshot = await getDocs(collection(db, "character-attributes"));

            if(!querySnapshot.empty) {
                const charAttributes: CharacterAttributes = {
                    charId: querySnapshot.docs[0].data().charId ?? null,
                    move: querySnapshot.docs[0].data().move ?? null,
                    attack: querySnapshot.docs[0].data().attack ?? null,
                    defend: querySnapshot.docs[0].data().defend ?? null,
                    wounds: querySnapshot.docs[0].data().wounds ?? null,
                };   
                res.status(200).json(charAttributes); 
            }
            else {
                res.status(404).json({ error: "No character attributes found" });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error retrieving attributes"})
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);

    }
    
}