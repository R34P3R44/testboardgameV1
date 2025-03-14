import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { EnemyPosition } from "@/app/data-types/characterType";
// import { v4 as uuidv4 } from 'uuid';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "GET"){
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    try{
        const querySnapshotEnemies = await getDocs(collection(db, "hex-layer-enemies"));
        const querySnapshotHexPositions = await getDocs(collection(db, "hex-layer-positions"));

        if(querySnapshotEnemies.empty || querySnapshotHexPositions.empty){
            return res.status(400).json({error: "No data found"})
        }

        const enemies = querySnapshotEnemies.docs.map((doc: any) => doc.data())
        const hexPositions = querySnapshotHexPositions.docs.map((doc: any) => doc.data())

        const enemiesWithPositions: EnemyPosition[] = hexPositions[0].positions.map((position: any, index: number) => {
            const matchingEnemies = enemies[0].enemies.filter((enemy: any) => enemy.category === position.selectedType)
            if(matchingEnemies.length > 0) {
                const enemy = matchingEnemies[index % matchingEnemies.length]
                return {
                    id: enemy.id,
                    charId: enemy.name,
                    active: true,
                    category: enemy.category,
                    latestPositions: {
                      x: position.x,
                      y: position.y,
                      dateTime: new Date().toISOString(),
                    }
                }
            }
        })
        res.json(enemiesWithPositions);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error retrieving data" });  
    }
}
