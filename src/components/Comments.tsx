"use client";
import { useState } from 'react';
import { fetchComments, Comment } from '../utils/fetchComments';
import { Description, Field, Input, Label, Button } from '@headlessui/react'
import clsx from 'clsx';

const extractvideoUrl = (url: string) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
};

const Comments = () => {
    const [comments, setComments] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetchComments = () => {
        const videoId = extractvideoUrl(videoUrl);

        if (videoId && keyword) {
            fetchComments(videoId, keyword, setLoading, setComments);
        } else {
            alert("Please enter both video url and keyword.");
        }
    };

    return (
        <div>
            <center>
            
            <h2>YouTube Comments</h2>
            <div className="input-field w-full max-w-md px-4">
                <Field className="text-left">
                    <Label className="text-sm/6 font-medium text-white">Youtube Video Link</Label>
                    <Description className="text-sm/6 text-white/50">Copy the link from your browser and paste it in the field below</Description>
                    <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </Field>
                <Field className='text-left mt-3'>
                    <Label className="text-sm/6 font-medium text-white">Keyword</Label>
                    <Description className="text-sm/6 text-white/50">What word are you searching for?</Description>
                    <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    />
                </Field>
            </div>


            <Button className="inline-flex items-center gap-2 rounded-md mt-5 bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={handleFetchComments} disabled={loading || (!keyword || !videoUrl)}>
                {loading ? "Fetching Comments..." : "Fetch Comments"}
            </Button>
            </center>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No comments found.</p>
            )}
        </div>
    );
};

export default Comments;
