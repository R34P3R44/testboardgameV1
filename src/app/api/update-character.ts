import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { ActiveStatus } from "../../app/data-types/characterType";

type Data = {
  id?: string;
  error?: string;
  success?: boolean
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PATCH") {
    const {charId, active } = req.body as ActiveStatus;

    if(!charId || typeof active !== "boolean"){
      return res.status(400).json({error: "Invalid request data"});
    }

    try {

      const charCollection = collection(db, "characters");
      const q = query(charCollection, where("charId", "==", charId));
      const querySnapshot = await getDocs(q);

      if(querySnapshot.empty){
        return res.status(400).json({error: "Character not found"})
      }

      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, "characters", docId)

      await updateDoc(docRef, {active});
      
      res.status(200).json({success: true });
    } catch (error) {
      console.log('Error updating character', error)
      res.status(500).json({ error: "Failed to update character" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}