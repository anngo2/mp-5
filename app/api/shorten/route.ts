import { NextResponse } from 'next/server';
import createNewURL from '@/app/lib/createNewURL';

export async function POST(request: Request) {
    let { url, alias } = await request.json();

    // Validate presence of url and alias
    if (!url || !alias) {
        return NextResponse.json(
            { message: 'URL and alias are required' },
            { status: 400 },
        );
    }

    // Prepend 'http://' if the URL does not have a protocol
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }

    // Validate URL format
    let urlObject;
    try {
        urlObject = new URL(url);
    } catch (error) {
        return NextResponse.json({ message: 'Invalid URL' }, { status: 400 });
    }

    // Validate alias format
    const aliasRegex = /^[a-zA-Z0-9-]{1,30}$/;
    if (!aliasRegex.test(alias)) {
        return NextResponse.json(
            {
                message:
                    'Too LONG! so special characters please',
            },
            { status: 400 },
        );
    }

    const result = await createNewURL(urlObject.href, alias);
    if (result) {
        return NextResponse.json(
            { message: 'URL shortened successfully' },
            { status: 200 },
        );
    } else {
        return NextResponse.json(
            { message: 'Alias already exists' },
            { status: 400 },
        );
    }
}
