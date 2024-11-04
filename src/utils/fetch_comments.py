#!/usr/bin/env python3

import requests
import json

API_KEY = "AIzaSyD76HWjGjQ5F6j2tkExCg5Qpz9mo60JaUA"
VIDEO_ID = input("Enter the video ID: ")

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

def main():
    comments = fetch_comments(VIDEO_ID, API_KEY)
    if comments:
        comment_texts = [comment['snippet']['topLevelComment']['snippet']['textDisplay'] for comment in comments]
        for text in comment_texts:
            print(f"{text}\n")
        with open(f"{VIDEO_ID}_comments.json", "w") as f:
            json.dump(comments, f, indent=2)
        print("Comments saved to", f.name)


if __name__ == "__main__":
    main()