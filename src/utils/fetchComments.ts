export interface Comment {
    snippet?: {
        topLevelComment?: {
            snippet?: {
                authorDisplayName: string;
                authorProfileImageUrl: string;
                publishedAt: string;
                textDisplay: string;
            };
            likeCount?: number;
        };
        totalReplyCount?: number;
    };
}

export const fetchComments = async (
    videoId: string,
    keyword: string,
    setLoading: (loading: boolean) => void,
    setComments: (comments: Comment[]) => void
) => {
    setLoading(true);
    try {
        const res = await fetch(`https://chattrix-backend.onrender.com/getComments?videoId=${videoId}&keyword=${keyword}`);
        if (!res.ok) {
            throw new Error("Failed to fetch comments.");
        }
        const data: Comment[] = await res.json();
        
        setComments(data);
    } catch (error) {
        console.error("Error fetching comments:", error);
        alert("There was an error fetching comments. Please try again later.");
    } finally {
        setLoading(false);
    }
};
