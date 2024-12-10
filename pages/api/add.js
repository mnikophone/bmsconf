// pages/api/data.js
import { use } from "react";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // Replace with your database name
    const user = req.body.user;

    const collection = db.collection("show"); // Replace with your collection name
    const data = await collection.insertOne({ ...user});
 
    if (data) {
      res.status(200).json({ success: true, data, stateR: "display" });
    } else {
      res.status(200).json({ success: true, data, stateR: "notfound" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to fetch data" });
  }
}
