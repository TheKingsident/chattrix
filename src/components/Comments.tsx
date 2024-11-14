"use client";
import { useState } from 'react';
import { fetchComments, Comment } from '../utils/fetchComments';
import { Field, Input, Button } from '@headlessui/react'
import clsx from 'clsx';
import Results from '@/components/Results';

const extractvideoUrl = (url: string) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
};

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResuls] = useState(false);

    async function handleFetchComments() {
        const videoId = extractvideoUrl(videoUrl);

        if (videoId && keyword) {
            setLoading(true);
            await fetchComments(videoId, keyword, setLoading, setComments);
            setShowResuls(true);
        } else {
            alert("Please enter both video url and keyword.");
        }
    };

    const handleCloseResults = () => {
        setShowResuls(false);
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl px-4">
                <div className='flex flex-col space-y-4'>
                    <Field className="text-left w-full">
                        <div className='bg-slate-800 rounded-xl p-5'>
                            <Input
                                className={clsx(
                                    'block w-full rounded-lg border-none bg-black py-2 px-3 text-white text-sm',
                                    'focus:outline-none focus:ring-2 focus:ring-white'
                                )}
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                pattern='https://www.youtube.com/watch\?v=.*'
                                placeholder='Enter a YouTube video URL in the Form https://www.youtube.com/watch\?v=.*'
                            />

                            <Input
                                className={clsx(
                                    'mt-3 block w-full rounded-lg border-none bg-black py-2 px-3 text-white text-sm',
                                    'focus:outline-none focus:ring-2 focus:ring-white'
                                )}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder='Enter a keyword to search for in comments'
                            />
                        </div>
                    </Field>
                </div>
            </div>

            <Button
                onClick={handleFetchComments}
                className="mt-5 bg-slate-500 text-white text-sm py-2 px-4 rounded-full hover:bg-slate-600"
            >
                {loading ? 'Loading...' : 'Fetch Comments'}
            </Button>

            {showResults && <Results comments={comments} onClose={handleCloseResults} />}
        </div>

    );
};

export default Comments;
