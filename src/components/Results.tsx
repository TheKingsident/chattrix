"use client";
import { Comment } from '@/utils/fetchComments';
import React, { FC } from 'react'
import { useState } from 'react';
import CommentCard from './CommentCard';

interface ResultsProps {
    comments: Comment[];
    onClose: () => void;
}

const Results: FC<ResultsProps> = ({ comments, onClose }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const CommentsPerPage = 5;
    const totalPages = Math.ceil(comments.length / CommentsPerPage);

    const indexOfLastComment = currentPage * CommentsPerPage;
    const indexOfFirstComment = indexOfLastComment - CommentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center p-5">
        <div className="bg-slate-700 rounded-lg p-5 w-full max-w-3xl overflow-auto">
            <button
                className="mb-4 bg-red-500 text-gray-300 py-1 px-3 rounded hover:bg-red-600"
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
                    className="bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || comments.length === 0}
                    className="bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default Results