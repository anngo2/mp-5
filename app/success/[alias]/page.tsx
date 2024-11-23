import Link from 'next/link'; // Import the Link component for navigation within the app
import { notFound } from 'next/navigation'; // Import the notFound function to handle 404 pages
import getURLByAlias from '@/app/lib/getURLByAlias'; // Import a utility function to fetch the URL associated with a given alias
import { Box, Typography } from '@mui/material'; // Import MUI components for styling

// Define the structure for the params object passed to this page


// Export the SuccessPage component as the default export
// This page will display the shortened URL after successful creation
export default async function SuccessPage({ params }: { params: { alias: string } }) {
    const { alias } = params; // Destructure the alias from the params
    const urlEntry = await getURLByAlias(alias); // Fetch the original URL associated with the alias

    // If no entry is found for the alias, trigger the 404 page
    if (!urlEntry) {
        notFound();
    }

    // Construct the shortened URL using the alias
    const shortUrl = `http://localhost:3000/${alias}`;

    // Render the success message and the shortened URL
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f4f8', // Light background color
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    backgroundColor: '#ffffff', // White box color
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    maxWidth: 400,
                }}
            >
                <Typography variant="h4" color="primary" >
                    YAY it WORKED!
                </Typography>
                <Typography variant="body1" color="textSecondary" >
                    The shortened URL is:
                </Typography>
                <Link href={`/${alias}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
                        {shortUrl}
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
