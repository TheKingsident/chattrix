import os
from flask import Flask, jsonify, request
from flask_cors import CORS as cors
from scripts.fetch_comments import fetch_comments
from dotenv import load_dotenv
from scripts.library_loader import load_library

app = Flask(__name__)
cors(app)

@app.route("/getComments", methods=["GET"])
def getComments():
    """
    Fetches comments from a video and filters them based on a keyword.
    This function retrieves comments from a video specified by the `videoId` parameter
    and filters them to include only those that contain the specified `keyword`.
    Returns:
        JSON response containing the filtered comments or an error message.
    Error Responses:
        400: If the `videoId` or `keyword` parameter is missing.
        500: If the API key is not found, fetching comments fails, loading the library fails,
             or there is an error processing the comments.
    Query Parameters:
        videoId (str): The ID of the video to fetch comments from.
        keyword (str): The keyword to filter comments by.
    Example:
        GET /comments?videoId=abc123&keyword=example
    """
    load_dotenv()
    
    API_KEY = os.getenv("API_KEY")
    if not API_KEY:
        return jsonify({"error": "API key not found"}), 500  # Server error due to missing API key

    video_id = request.args.get("videoId")
    if not video_id:
        return jsonify({"error": "videoId parameter is required"}), 400  # Bad request if no videoId is given

    keyword = request.args.get("keyword")
    if not keyword:
        return jsonify({"error": "keyword parameter is required"}), 400  # Bad request if no keyword is given

    try:
        comments = fetch_comments(video_id=video_id, api_key=API_KEY)
    except Exception as e:
        return jsonify({"error": "Failed to fetch comments", "details": str(e)}), 500  # Internal server error

    try:
        lib = load_library()
    except Exception as e:
        return jsonify({"error": "Failed to load library", "details": str(e)}), 500  # Internal server error

    try:
        filtered_comments = [
            comment for comment in comments
            if lib.contains_keyword(comment['snippet']['topLevelComment']['snippet']['textDisplay'].encode(), keyword.encode())
        ]
    except KeyError as e:
        return jsonify({"error": "Invalid comment structure", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Error processing comments", "details": str(e)}), 500

    response = jsonify(filtered_comments)
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
