import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface FactionsData {
  id: number;
  active: boolean;
  charId: string;
  description: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "characters"));

      const faction: FactionsData[] = querySnapshot.docs.map(doc => ({
        active: doc.data().active ?? null,
        charId: doc.data().charId ?? null,
        description: doc.data().description ?? null,
        id: doc.data().id ?? null,
      }));
      res.status(200).json(faction);
    } catch (error: any) {
      res.status(500).json({ error: "Error retrieving factions" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}