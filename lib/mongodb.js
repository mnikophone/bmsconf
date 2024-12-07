// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://user:CTd6YDQxy50kLg8a@cluster0.rm8f1ra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Your MongoDB connection string
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to prevent creating too many connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
