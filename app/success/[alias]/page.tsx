// app/success/[alias]/page.tsx
'use client';

import Link from 'next/link'; // Import the Link component for navigation within the app
import { useParams, useRouter } from 'next/navigation'; // Import useParams and useRouter hooks
import { useEffect, useState } from 'react'; // Import React hooks
import { Box, Typography } from '@mui/material'; // Import MUI components for styling

// Export the SuccessPage component as the default export
// This page will display the shortened URL after successful creation
export default function SuccessPage() {
    const params = useParams(); // Use useParams to access route parameters
    const alias = params.alias as string; // Get the alias from the params
    const router = useRouter(); // Hook for navigation
    const [urlEntry, setUrlEntry] = useState(null); // State to store the URL entry

    useEffect(() => {
        // Function to fetch the URL entry
        const fetchUrlEntry = async () => {
            try {
                const res = await fetch(`/api/shorten?alias=${encodeURIComponent(alias)}`);
                if (res.ok) {
                    const data = await res.json();
                    setUrlEntry(data);
                } else {
                    // If no entry is found, redirect to the 404 page
                    router.replace('/404');
                }
            } catch (error) {
                console.error('Error fetching URL entry:', error);
            }
        };

        if (alias) {
            fetchUrlEntry();
        }
    }, [alias, router]);

    // If the URL entry hasn't been loaded yet
    if (!urlEntry) {
        return <div>Loading...</div>;
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
                <Typography variant="h4" color="primary">
                    YAY it WORKED!
                </Typography>
                <Typography variant="body1" color="textSecondary">
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
