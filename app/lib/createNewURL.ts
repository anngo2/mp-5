'use server'; // Indicates that this code should run on the server side

import getCollection, { URL_COLLECTION } from '@/db'; // Import the database utility function and collection constant
import { URLProps } from '@/type'; // Import the URLProps type definition

// Define an asynchronous function to create a new URL entry in the database
// Takes a URL and an alias as input, and returns the created URLProps object or null
export default async function createNewURL(
    url: string, // Original URL to be shortened
    alias: string, // Alias for the shortened URL
): Promise<URLProps | null> {
    // Define the URL entry object with the alias and original URL
    const urlEntry = {
        alias: alias, // Alias for the URL
        url: url, // Original URL
    };

    // Get the URL collection from the database
    const urlCollection = await getCollection(URL_COLLECTION);

    // Check if the alias already exists in the collection
    const existing = await urlCollection.findOne({ alias });
    if (existing) {
        return null; // Return null if the alias is already taken
    }

    // Insert the new URL entry into the collection
    const res = await urlCollection.insertOne(urlEntry);

    // Check if the insertion was successful
    if (!res.acknowledged) {
        return null; // Return null if the insertion failed
    }

    // Return the created URL entry with the generated ID
    return { ...urlEntry, id: res.insertedId.toHexString() };
}
