import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Position } from "../../app/data-types/characterType";

type Data = {
  id?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { x, y, dateTime } = req.body as Position;

    try {
      const docRef = await addDoc(collection(db, "character-positions"), {
        x,
        y,
        dateTime,
      });
      res.status(200).json({ id: docRef.id });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error adding document" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}