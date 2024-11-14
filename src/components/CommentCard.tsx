import React from 'react';
import { Comment } from '@/utils/fetchComments'

interface CommentCardProps {
    comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({comment }) => {
    const snippet = comment.snippet?.topLevelComment?.snippet;
    if (!snippet) return null;

    return (
        <div className="flex flex-col bg-gray-300 p-4 rounded-xl shadow-lg space-y-3">
            <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full object-cover" src={snippet.authorProfileImageUrl} alt={`${snippet.authorDisplayName}'s pic`} />
                <div>
                    <h3 className="text-lg font-semibold">{snippet.authorDisplayName}</h3>
                    <p className="text-sm text-gray-600">Posted on {new Date(snippet.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-gray-800">{snippet.textDisplay}</p>
            <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-white bg-black px-3 py-1 rounded-lg">
                    <span>👍</span>
                    <span>{comment.snippet?.topLevelComment?.likeCount} Likes</span>
                </button>
                <button className="flex items-center space-x-2 text-white bg-black px-3 py-1 rounded-lg">
                    <span>↩️</span>
                    <span>{comment.snippet?.totalReplyCount} Replies</span>
                </button>
            </div>
        </div>
    );
};

export default CommentCard;
