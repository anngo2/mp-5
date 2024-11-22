import getCollection, { URL_COLLECTION } from '@/db'; // Import the database utility function and collection constant
import { URLProps } from '@/type'; // Import the URLProps type definition

// Define an asynchronous function to fetch a URL entry by its alias
// Takes an alias as input and returns a URLProps object or null
export default async function getURLByAlias(alias: string): Promise<URLProps | null> {
    // Get the collection from the database
    const urlCollection = await getCollection(URL_COLLECTION);

    // Query the collection to find an entry with the matching alias
    const data = await urlCollection.findOne({ alias });

    // If no matching entry is found, return null
    if (data === null) {
        return null;
    }

    // Map the database result to the URLProps structure
    const urlEntry = {
        id: data._id.toHexString(), // Convert the MongoDB ObjectId to a string
        alias: data.alias, // Get the alias from the data
        url: data.url, // Get the original URL from the data
    };

    // Return the URL entry object
    return urlEntry;
}
