import { redirect } from 'next/navigation'; // Import the redirect function from Next.js for server-side redirection
import getURLByAlias from '../lib/getURLByAlias'; // Import the utility function to retrieve a URL by its alias

// Define the structure of the `params` object passed to this page

// Export the AliasPage component as the default export
// This page handles redirection to the original URL or displays an error if the alias is not found
type Params = Promise<{ alias: string }>

export default async function AliasPage({params,}: { params: Params; }) {
    console.log(params);
    const resolvedParams = await params; // Resolve the promise
    const { alias } = resolvedParams; // Destructure the alias from the params

    // Fetch the URL entry associated with the alias
    const urlEntry = await getURLByAlias(alias);

    if (urlEntry) {
        // If the URL entry exists, redirect to the original URL
        redirect(urlEntry.url);
    } else {
        // If the alias is not found, render a "Not Found" message
        return (
            <div>
                <h1>Not found :(</h1> {/* Display a message indicating that the alias does not exist */}
                <p>The alias does not exist.</p> {/* Inform the user that the alias is not valid */}
            </div>
        );
    }
}
