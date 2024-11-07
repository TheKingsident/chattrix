"use client";
import { useState } from 'react';
import { fetchComments, Comment } from '../utils/fetchComments';

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
            <div>
                <label>Video ID:</label>
                <input
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    placeholder="Enter video ID"
                    className='text-black'
                />
            </div>
            <div>
                <label>Keyword:</label>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                    className='text-black'
                />
            </div>
            <button onClick={handleFetchComments} disabled={loading}>
                {loading ? "Fetching Comments..." : "Fetch Comments"}
            </button>
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
