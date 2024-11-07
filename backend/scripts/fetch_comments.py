#!/usr/bin/env python3

import requests
from requests.exceptions import RequestException

def fetch_comments(video_id, api_key):
    """
    Fetches comments from a YouTube video using the YouTube Data API v3.
    
    Args:
        video_id (str): The ID of the YouTube video for which to fetch comments.
        api_key (str): The API key to authenticate the request.
        
    Returns:
        list: A list of comment threads, where each thread is represented as a dictionary.
        
    Raises:
        RequestException: If an error occurs while making the HTTP request.
    """
    url = "https://www.googleapis.com/youtube/v3/commentThreads"
    params = {
        "part": "snippet",
        "videoId": video_id,
        "key": api_key,
        "maxResults": 100
    }
    all_comments = []
    
    try:
        while True:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()  # Raises an HTTPError for 4xx/5xx responses

            # Attempt to parse JSON response
            try:
                data = response.json()
            except ValueError:
                print("Failed to parse JSON response.")
                break

            # Retrieve comments and handle pagination
            comments = data.get('items', [])
            all_comments.extend(comments)
            next_page_token = data.get('nextPageToken')

            if next_page_token:
                params['pageToken'] = next_page_token
            else:
                break

    except RequestException as e:
        print(f"HTTP request failed: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    return all_comments


# Example usage
if __name__ == "__main__":
    video_id = "YOUR_VIDEO_ID"
    api_key = "YOUR_API_KEY"
    comments = fetch_comments(video_id, api_key)
    if comments:
        print(f"Fetched {len(comments)} comments")
    else:
        print("No comments fetched.")
