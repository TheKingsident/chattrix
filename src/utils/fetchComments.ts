/**
 * Represents the structure of a YouTube comment.
 */
export interface Comment {
    snippet?: {
        topLevelComment?: {
            snippet?: {
                /**
                 * The display name of the comment's author.
                 */
                authorDisplayName: string;
                /**
                 * The URL of the author's profile image.
                 */
                authorProfileImageUrl: string;
                /**
                 * The timestamp of when the comment was published.
                 */
                publishedAt: string;
                /**
                 * The text content of the comment.
                 */
                textDisplay: string;
                /**
                 * The number of likes the comment has received (optional).
                 */
                likeCount?: number;
            };
        };
        /**
         * The total number of replies to the top-level comment (optional).
         */
        totalReplyCount?: number;
    };
}

/**
 * Fetches comments from the backend for a specific YouTube video and keyword.
 *
 * @param {string} videoId - The ID of the YouTube video.
 * @param {string} keyword - The keyword to filter comments.
 * @param {(loading: boolean) => void} setLoading - Callback to set the loading state.
 * @param {(comments: Comment[]) => void} setComments - Callback to update the comments state.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const fetchComments = async (
    videoId: string,
    keyword: string,
    setLoading: (loading: boolean) => void,
    setComments: (comments: Comment[]) => void
): Promise<void> => {
    setLoading(true); // Set loading state to true before fetching
    try {
        const res = await fetch(`https://chattrix-backend.onrender.com/getComments?videoId=${videoId}&keyword=${keyword}`);
        if (!res.ok) {
            throw new Error("Failed to fetch comments."); // Handle non-successful response
        }
        const data: Comment[] = await res.json(); // Parse response JSON into an array of comments
        setComments(data); // Update comments state
    } catch (error) {
        console.error("Error fetching comments:", error); // Log the error
        alert("There was an error fetching comments. Please try again later."); // Notify the user
    } finally {
        setLoading(false); // Reset loading state
    }
};
