'use client'; // Indicates that this component should be rendered on the client side (Next.js specific)

import NewURL from './components/new-url'; // Import the NewURL component from the specified path

// Define and export the Home component as the default export
export default function Home() {
  // Asynchronous function to create a new shortened URL
  async function createFunc(url: string, alias: string): Promise<boolean> {
    try {
      // Send a POST request to the '/api/shorten' endpoint with the URL and alias data
      const res = await fetch('/api/shorten', {
        method: 'POST', // HTTP method
        headers: { 'Content-Type': 'application/json' }, // Set the request headers
        body: JSON.stringify({ url, alias }), // Convert the data to a JSON string
      });

      // Check if the response is OK (status in the range 200-299)
      if (res.ok) {
        return true; // Return true if the request was successful
      } else {
        return false; // Return false if the server responded with an error status
      }
    } catch {
      return false; // Return false if there was an error with the fetch request
    }
  }

  // Render the component UI
  return (
      <div> {/* Container with flex layout and centered items */}
        <h1 style={{ textAlign: 'center',fontWeight: 'bold', color:'burlywood'}}>
          URL Shortener
        </h1>


        {/* Page title */}
        <NewURL createFunc={createFunc}/> {/* Include the NewURL component and pass createFunc as a prop */}
      </div>
  );
}
