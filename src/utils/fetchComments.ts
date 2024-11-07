// utils/fetchComments.ts
export interface Comment {
    snippet?: {
        topLevelComment?: {
            snippet?: {
                textDisplay: string;
            };
        };
    };
}

export const fetchComments = async (
    videoId: string,
    keyword: string,
    setLoading: (loading: boolean) => void,
    setComments: (comments: string[]) => void
) => {
    setLoading(true);
    try {
        const res = await fetch(`https://chattrix-backend.onrender.com/getComments?videoId=${videoId}&keyword=${keyword}`);
        if (!res.ok) {
            throw new Error("Failed to fetch comments.");
        }
        const data: Comment[] = await res.json();
        const commentTexts = data.map((comment) =>
            comment.snippet?.topLevelComment?.snippet?.textDisplay || 'No comment text'
        );
        setComments(commentTexts);
    } catch (error) {
        console.error("Error fetching comments:", error);
        alert("There was an error fetching comments. Please try again later.");
    } finally {
        setLoading(false);
    }
};
