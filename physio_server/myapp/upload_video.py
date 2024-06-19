# Load and use the stored credentials for uploading video. 
# need in the same directory: credentials.json, video.mp4 


import os
import json
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import traceback

# Define constants
CREDENTIALS_FILE = r"C:\Users\lihi7\project2\Final_Project\physio_server\myapp\credentials.json"
CLIENT_SECRETS_FILE = "client_secret.json"
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

def load_credentials():
    with open(CREDENTIALS_FILE, "r") as f:
        credentials_data = json.load(f)
    return google.oauth2.credentials.Credentials(
        credentials_data["token"],
        refresh_token=credentials_data["refresh_token"],
        token_uri=credentials_data["token_uri"],
        client_id=credentials_data["client_id"],
        client_secret=credentials_data["client_secret"],
        scopes=credentials_data["scopes"]
    )

def get_authenticated_service():
    credentials = load_credentials()
    return googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)

def upload_video(youtube, file, title, description, category, tags):
    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": tags,
            "categoryId": category
        },
        "status": {
            "privacyStatus": "private"
        }
    }

    media_body = googleapiclient.http.MediaFileUpload(file, chunksize=-1, resumable=True)

    insert_request = youtube.videos().insert(
        part="snippet,status",
        body=body,
        media_body=media_body
    )

    response = None
    while response is None:
        status, response = insert_request.next_chunk()
        if status:
            print(f"Uploaded {int(status.progress() * 100)}%")
    
    print("Upload Complete!")
    print(f"Video ID: {response.get('id')}")
    return response.get('id')


def upload_video_to_youtube(file, title, description, category="22", tags=[]):
    # youtube = get_authenticated_service()
    try:
        youtube = get_authenticated_service()
        video_id = upload_video(youtube, file, title, description, category, tags)
        return {"success": True, "video_id": video_id}
    except Exception as e:
        # print(f"An error occurred: {e}")
        traceback.print_exc()
        return {"success": False, "error": str(e)}


