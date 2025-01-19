"use client";

import { Comment } from '@/utils/fetchComments';
import React, { FC, useState } from 'react';
import CommentCard from './CommentCard';

/**
 * Props for the `Results` component.
 * 
 * @typedef {Object} ResultsProps
 * @property {Comment[]} comments - Array of comments to display.
 * @property {() => void} onClose - Callback function to close the results modal.
 */
interface ResultsProps {
    comments: Comment[];
    onClose: () => void;
}

/**
 * `Results` Component.
 * Displays a modal with paginated comments and navigation controls.
 * 
 * @param {ResultsProps} props - Props for the `Results` component.
 * @param {Comment[]} props.comments - Array of comments to display.
 * @param {() => void} props.onClose - Callback function to close the modal.
 * @returns {JSX.Element} The rendered `Results` component.
 */
const Results: FC<ResultsProps> = ({ comments, onClose }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const CommentsPerPage = 5; // Number of comments per page
    const totalPages = Math.ceil(comments.length / CommentsPerPage);

    // Calculate the indices for slicing the comments array
    const indexOfLastComment = currentPage * CommentsPerPage;
    const indexOfFirstComment = indexOfLastComment - CommentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    /**
     * Moves to the next page if it exists.
     */
    const handleNextPage = (): void => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    /**
     * Moves to the previous page if it exists.
     */
    const handlePrevPage = (): void => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center p-5">
            <div className="bg-slate-700 rounded p-5 w-full max-w-3xl overflow-auto">
                <button
                    className="mb-4 bg-red-500 text-gray-300 text-sm py-1 px-3 rounded hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
                <ul className="space-y-3">
                    {comments.length === 0 ? (
                        <li className="p-10 text-center text-gray-300">No comments with that keyword found.</li>
                    ) : (
                        currentComments.map((comment, index) => (
                            <li key={index}>
                                <CommentCard comment={comment} />
                            </li>
                        ))
                    )}
                </ul>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white py-1 text-sm px-3 rounded disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <p>
                        Page {currentPage} of {totalPages}
                    </p>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || comments.length === 0}
                        className="bg-blue-500 text-white text-sm py-1 px-3 rounded disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
