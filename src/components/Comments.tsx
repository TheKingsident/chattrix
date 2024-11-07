"use client";
import { useState } from 'react';
import { fetchComments, Comment } from '../utils/fetchComments';
import { Description, Field, Input, Label, Button } from '@headlessui/react'
import clsx from 'clsx';

const Comments = () => {
    const [comments, setComments] = useState<string[]>([]);
    const [videoId, setVideoId] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetchComments = () => {
        if (videoId && keyword) {
            fetchComments(videoId, keyword, setLoading, setComments);
        } else {
            alert("Please enter both video ID and keyword.");
        }
    };

    return (
        <div>
            
            <h2>YouTube Comments</h2>
            <div className="input-field w-full max-w-md px-4">
                <Field>
                    <Label className="text-sm/6 font-medium text-white">Youtube Video ID</Label>
                    <Description className="text-sm/6 text-white/50">Copy the link from your browser and paste it in the field below</Description>
                    <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    />
                </Field>
                <Field className='mt-3'>
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


            <Button className="inline-flex items-center gap-2 rounded-md mt-3 bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={handleFetchComments} disabled={loading}>
                {loading ? "Fetching Comments..." : "Fetch Comments"}
            </Button>
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
