"use client";
import { useState } from 'react';
import { fetchComments, Comment } from '../utils/fetchComments';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Field, Input, Button } from '@headlessui/react';
import clsx from 'clsx';
import Results from '@/components/Results';

/**
 * Extracts the video ID from a given YouTube URL.
 * Supports URLs in the `youtube.com` and `youtu.be` formats.
 * 
 * @param {string} url - The YouTube video URL.
 * @returns {string | null} The extracted video ID or `null` if invalid.
 */
const extractvideoUrl = (url: string): string | null => {
    try {
        const urlObj = new URL(url);

        if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
            return urlObj.searchParams.get("v");
        } else if (urlObj.hostname === "youtu.be") {
            return urlObj.pathname.substring(1);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error parsing video URL:", error);
        return null;
    }
};

/**
 * React component for fetching and displaying YouTube comments based on a keyword.
 * Allows the user to input a YouTube video URL and a keyword, fetch matching comments,
 * and display the results in a separate results section.
 * 
 * @component
 * @returns {JSX.Element} The JSX element for the Comments component.
 */
const Comments = (): JSX.Element => {
    const [comments, setComments] = useState<Comment[]>([]); // List of comments fetched from the server.
    const [videoUrl, setVideoUrl] = useState<string>(""); // The YouTube video URL entered by the user.
    const [keyword, setKeyword] = useState<string>(""); // The keyword to search for in comments.
    const [loading, setLoading] = useState<boolean>(false); // Loading state during the fetch operation.
    const [showResults, setShowResults] = useState<boolean>(false); // Whether to display the results.

    /**
     * Handles the process of fetching YouTube comments based on the provided video URL and keyword.
     * Validates the inputs and displays appropriate messages in case of errors.
     * 
     * @async
     */
    async function handleFetchComments(): Promise<void> {
        const videoId = extractvideoUrl(videoUrl);

        if (!videoId) {
            toast.error("Invalid video URL. Please enter a valid YouTube video URL.");
            return;
        }

        if (!keyword) {
            toast.error("Please enter a keyword to search for.");
            return;
        }

        try {
            setLoading(true);
            await fetchComments(videoId, keyword, setLoading, setComments);
            setShowResults(true);
            toast.success("Comments fetched successfully!");
        } catch (err) {
            toast.error("Failed to fetch comments. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handles the closing of the results section.
     */
    const handleCloseResults = (): void => {
        setShowResults(false);
    };

    return (
        <div className="w-full bg-gray-900 flex flex-col items-center justify-center">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-2xl px-4">
                <div className="flex flex-col space-y-4">
                    <Field className="text-left w-full">
                        <div className="bg-slate-800 rounded-xl p-5">
                            {/* Input for the YouTube video URL */}
                            <Input
                                className={clsx(
                                    'block w-full rounded-lg border-none bg-black py-2 px-3 text-white text-sm',
                                    'focus:outline-none focus:ring-2 focus:ring-white'
                                )}
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                pattern="https://www.youtube.com/watch\?v=.*"
                                placeholder="Enter a YouTube video URL"
                            />

                            {/* Input for the keyword */}
                            <Input
                                className={clsx(
                                    'mt-3 block w-full rounded-lg border-none bg-black py-2 px-3 text-white text-sm',
                                    'focus:outline-none focus:ring-2 focus:ring-white'
                                )}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Enter a keyword to search for in comments"
                            />
                        </div>
                    </Field>
                </div>
            </div>

            {/* Button to fetch comments */}
            <Button
                onClick={handleFetchComments}
                className="mt-5 bg-slate-500 text-white text-sm py-2 px-4 rounded-full hover:bg-slate-600"
            >
                {loading ? 'Loading...' : 'Fetch Comments'}
            </Button>

            {/* Results section */}
            {showResults && <Results comments={comments} onClose={handleCloseResults} />}
        </div>
    );
};

export default Comments;
