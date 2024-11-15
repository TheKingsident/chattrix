import React from 'react';
import { Comment } from '@/utils/fetchComments'
import formatCommentText from '@/utils/formatComment';
import Image from 'next/image';

interface CommentCardProps {
    comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({comment }) => {
    const snippet = comment.snippet?.topLevelComment?.snippet;
    if (!snippet) return null;
    console.log(snippet.authorProfileImageUrl)


    return (
        <div className="flex flex-col bg-gray-300 p-4 rounded shadow-lg space-y-3">
            <div className="flex items-center space-x-4">
                <Image className="w-12 h-12 rounded-full object-cover"
                    src={snippet.authorProfileImageUrl}
                    alt={`${snippet.authorDisplayName}'s pic`} 
                    width={48}
                    height={48}
                    onError={(e) => {
                        e.currentTarget.src = '/profile.svg';
                    }}/>
                <div>
                    <h3 className="text-sm font-semibold">{snippet.authorDisplayName}</h3>
                    <p className="text-xs text-gray-600">Posted on {new Date(snippet.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-gray-800 text-sm">{formatCommentText(snippet.textDisplay)}</p>
            <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-white bg-gray-800 text-xs px-3 py-1 rounded-sm">
                    <span>👍</span>
                    <span>{snippet.likeCount} Likes</span>
                </div>
                <div className="flex items-center space-x-2 text-white bg-gray-800 text-xs px-3 py-1 rounded-sm">
                    <span>↩️</span>
                    <span>{comment.snippet?.totalReplyCount} Replies</span>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
