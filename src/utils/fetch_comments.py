import requests
import json

API_KEY = "AIzaSyD76HWjGjQ5F6j2tkExCg5Qpz9mo60JaUA"
VIDEO_ID = "eURYSlBU1gk"

def fetch_comments(video_id, api_key):
    url = f"https://www.googleapis.com/youtube/v3/commentThreads"
    params = {
        "part": "snippet",
        "videoId": video_id,
        "key": api_key,
        "maxResults": 100
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        comments = response.json()
        return comments['items']
    else:
        print("Unable to fetch comments:", response.status_code, response.json())
        return []

comments = fetch_comments(VIDEO_ID, API_KEY)
