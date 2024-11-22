// Define metadata for the application, such as the title that will appear in the browser tab
export const metadata = {
    title: 'An Ngo URL Shortener', // Sets the title of the application
};

// Define and export the RootLayout component as the default export
// This component serves as the layout for the application, wrapping all child components
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en"> {/* Define the language of the document as English */}
        <body>{children}</body> {/* Render the children components inside the body tag */}
        </html>
    );
}
