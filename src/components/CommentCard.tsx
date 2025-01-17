import React from 'react';
import { BiLike } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { Comment } from '@/utils/fetchComments';
import formatCommentText from '@/utils/formatComment';
import ProfileImageWithFallBack from './ProfileImageWithFallBack';

/**
 * Props for the `CommentCard` component.
 * @interface CommentCardProps
 */
interface CommentCardProps {
    /**
     * The comment object to be displayed.
     */
    comment: Comment;
}

/**
 * A React functional component that renders a card displaying a YouTube comment.
 * Includes the author's profile image, name, date, comment text, likes, and replies.
 *
 * @param {CommentCardProps} props - The props containing the comment object.
 * @returns {JSX.Element | null} The JSX element for the comment card or `null` if no valid comment snippet is provided.
 */
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    const snippet = comment.snippet?.topLevelComment?.snippet;
    if (!snippet) return null; // Return null if no valid snippet is provided.

    const imgSrc = snippet?.authorProfileImageUrl;

    return (
        <div className="flex flex-col bg-gray-300 p-4 rounded shadow-lg space-y-3">
            {/* Profile section */}
            <div className="flex items-center space-x-4">
                <ProfileImageWithFallBack
                    className="w-12 h-12 rounded-full object-cover"
                    src={imgSrc}
                    alt={`${snippet.authorDisplayName}'s pic`}
                    width={48}
                    height={48}
                    fallbackSrc={'/profile.svg'}
                />
                <div>
                    <h3 className="text-sm font-semibold">{snippet.authorDisplayName}</h3>
                    <p className="text-xs text-gray-600">
                        Posted on {new Date(snippet.publishedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Comment text */}
            <p className="text-gray-800 text-sm">{formatCommentText(snippet.textDisplay)}</p>

            {/* Like and reply counts */}
            <div className="flex space-x-4">
                {/* Likes section */}
                <div className="flex items-center space-x-2 text-white bg-gray-800 text-xs px-3 py-1 rounded-sm">
                    <BiLike />
                    <span>
                        {snippet.likeCount != null ? (
                            snippet.likeCount === 1 ? `${snippet.likeCount} Like` : `${snippet.likeCount} Likes`
                        ) : (
                            '0 Likes'
                        )}
                    </span>
                </div>

                {/* Replies section */}
                <div className="flex items-center space-x-2 text-white bg-gray-800 text-xs px-3 py-1 rounded-sm">
                    <BsReply />
                    <span>
                        {comment.snippet?.totalReplyCount != null ? (
                            comment.snippet?.totalReplyCount === 1 ? `${comment.snippet?.totalReplyCount} Reply` : `${comment.snippet?.totalReplyCount} Replies`
                        ) : (
                            '0 Replies'
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
