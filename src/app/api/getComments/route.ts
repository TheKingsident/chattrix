import { NextResponse } from 'next/server';

interface RequestParams {
    videoId: string | null;
    keyword: string | null;
}

interface ErrorResponse {
    message: string;
}

interface Comment {
    // Define the structure of a comment based on your API response
}

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams }: URL = new URL(request.url);
    const videoId: RequestParams['videoId'] = searchParams.get('videoId');
    const keyword: RequestParams['keyword'] = searchParams.get('keyword');

    if (!videoId || !keyword) {
        return NextResponse.json<ErrorResponse>({ message: 'videoId and keyword parameters are required' }, { status: 400 });
    }

    try {
        const response: Response = await fetch(`https://chattrix-backend.onrender.com/getComments?videoId=${videoId}&keyword=${keyword}`);

        if (!response.ok) {
            console.error('Error fetching data:', response.status, await response.text());
            return NextResponse.json<ErrorResponse>({ message: 'Failed to fetch comments' }, { status: response.status });
        }

        const data: Comment[] = await response.json();
        return NextResponse.json<Comment[]>(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json<ErrorResponse>({ message: 'Internal Server Error' }, { status: 500 });
    }
}
