// app/api/shorten/route.ts

import { NextResponse } from 'next/server';
import createNewURL from '@/app/lib/createNewURL'; // Import the function to create a new URL entry
import getURLByAlias from '@/app/lib/getURLByAlias'; // Import the function to retrieve a URL entry by alias

// Handler for POST requests (creating a new shortened URL)
export async function POST(request: Request) {
    // Parse the request body to get the URL and alias
    const { url, alias } = await request.json();

    // Validate the presence of url and alias
    if (!url || !alias) {
        return NextResponse.json(
            { message: 'URL and alias are required' },
            { status: 400 }
        );
    }

    // Prepend 'http://' if the URL does not have a protocol
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
        formattedUrl = 'http://' + url;
    }

    // Validate the URL format
    try {
        new URL(formattedUrl);
    } catch {
        return NextResponse.json({ message: 'Invalid URL' }, { status: 400 });
    }

    // Validate the alias format
    const aliasRegex = /^[a-zA-Z0-9-]{1,30}$/;
    if (!aliasRegex.test(alias)) {
        return NextResponse.json(
            {
                message:
                    'Alias can only contain alphanumeric characters and hyphens, up to 30 characters',
            },
            { status: 400 }
        );
    }

    // Attempt to create the new URL entry
    const result = await createNewURL(formattedUrl, alias);

    if (result) {
        // Return a success response if creation was successful
        return NextResponse.json(
            { message: 'URL shortened successfully', data: result },
            { status: 200 }
        );
    } else {
        // Return an error if the alias already exists
        return NextResponse.json(
            { message: 'Alias already exists' },
            { status: 400 }
        );
    }
}

// Handler for GET requests (retrieving a URL entry by alias)
export async function GET(request: Request) {
    // Parse the query parameters to get the alias
    const { searchParams } = new URL(request.url);
    const alias = searchParams.get('alias');

    // Validate the presence of alias
    if (!alias) {
        return NextResponse.json({ message: 'Alias is required' }, { status: 400 });
    }

    // Retrieve the URL entry using the alias
    const urlEntry = await getURLByAlias(alias);

    if (urlEntry) {
        // Return the URL entry if found
        return NextResponse.json(urlEntry, { status: 200 });
    } else {
        // Return an error if the alias does not exist
        return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }
}
