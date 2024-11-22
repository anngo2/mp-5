'use client'; // Indicates that this component should be rendered on the client side (Next.js specific)

import React, { useState } from 'react'; // Import React and useState hook for state management
import { Button, TextField, Box } from "@mui/material"; // Import Material-UI components for styling

// Define and export the NewURL component
// The component takes a `createFunc` prop, which is a function to handle URL creation
export default function NewURL({createFunc,}: {
    createFunc: (url: string, alias: string) => Promise<boolean>; // Function signature for createFunc
}) {
    // State variables for the URL, alias, and error message
    const [url, setUrl] = useState(''); // State for the input URL
    const [alias, setAlias] = useState(''); // State for the input alias
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // Asynchronous function to handle form submission
    async function submitNewURL() {
        // Call the createFunc and check if the URL was created successfully
        if (await createFunc(url, alias)) {
            setUrl(''); // Reset the URL input
            setAlias(''); // Reset the alias input
            setErrorMessage(''); // Clear any error message
            // Redirect to the success page for the created alias
            window.location.href = `/success/${alias}`;
        } else {
            // Display an error message if the alias already exists or the URL is invalid
            setErrorMessage('Alias already exists (access by localhost:3000/success/[alias]) or URL is invalid');
        }
    }

    // Render the component
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'burlywood',
            }}
        >
            <Box
                sx={{

                    padding: 4,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault(); // Prevent default form submission
                        submitNewURL(); // Call the submitNewURL function
                    }}
                >
                    {/* Input field for the URL */}
                    <TextField

                        fullWidth // Occupy the full width of the container
                        sx={{ marginBottom: 2 }} // Add spacing below the input
                        label="URL" // Input label
                        value={url} // Bind value to the URL state
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUrl(e.target.value)
                        } // Update URL state on change
                    />
                    {/* Input field for the alias */}
                    <TextField

                        fullWidth // Occupy the full width of the container
                        sx={{ marginBottom: 2 }} // Add spacing below the input
                        label="Alias" // Input label
                        value={alias} // Bind value to the alias state
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAlias(e.target.value)
                        } // Update alias state on change
                    />
                    {/* Display error message if present */}
                    {errorMessage && (
                        <Box
                            sx={{
                                color: 'red',
                                marginBottom: 2,
                                fontSize: '0.9rem',
                            }}
                        >
                            {errorMessage}
                        </Box>
                    )}
                    {/* Submit button */}
                    <Button
                        variant="contained" // Material-UI variant for the button
                        fullWidth // Occupy the full width of the container
                        type="submit" // Set the button type to submit
                        disabled={url.length === 0 || alias.length === 0} // Disable the button if inputs are empty
                    >
                        Create {/* Button label */}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
