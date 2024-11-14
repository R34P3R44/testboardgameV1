import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Position } from "../../app/data-types/characterType";

type Data = {
  positions?: Position[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "character-positions"));
      const positions: Position[] = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          x: data.x || null,
          y: data.y || null,
          dateTime: data.dateTime || null,
        };
      });
      res.status(200).json({ positions });
    } catch (error: any) {
      console.error("Error retrieving positions:", error);
      res.status(500).json({ error: "Error retrieving users" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}