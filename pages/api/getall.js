// pages/api/data.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // Replace with your database name
 


    const collection = db.collection("show"); // Replace with your collection name
    const cursor = collection.find();

    // Convert cursor to an array and log the results
    const documents = await cursor.toArray();
    console.log(documents);
    
   
    if (documents) {
      res.status(200).json({ success: true, documents, stateR: "display" });
    } else {
      res.status(200).json({ success: true, documents, stateR: "notfound" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to fetch data" });
  }
}
