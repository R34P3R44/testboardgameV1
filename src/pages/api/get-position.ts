import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CharacterPosition } from "@/app/data-types/characterType";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const characterSnapshot = await getDocs(collection(db, "characters"));
      const characters = characterSnapshot.docs.map((doc: any) => doc.data());

      const positionsSnapshot = await getDocs(collection(db, "character-positions"));
      const positions = positionsSnapshot.docs.map((doc: any) =>  doc.data());

      const uniqueCharacters: CharacterPosition[] = characters.map((character) => {
        const charPositions = positions
        .filter((pos: any) => pos.charId === character.charId)
        .sort((a,b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
        return {
          charId: character.charId,
          active: character.active,
          latestPositions: charPositions[0] || null,
        }
      })
      res.json(uniqueCharacters);
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: "Error retrieving users" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}