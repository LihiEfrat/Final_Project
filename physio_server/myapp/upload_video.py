# Load and use the stored credentials for uploading video. 
# need in the same directory: credentials.json

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
import googleapiclient.discovery
import googleapiclient.errors
import googleapiclient.discovery
import googleapiclient.errors
import traceback

TOKEN_FILE = './myapp/credentials.json'
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

def load_credentials():
    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # Handle initial authorization (requires human interaction)
            # This part should be done manually once to get the initial token
            raise Exception("Initial authorization required")

        # Save the refreshed credentials
        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())

    return creds

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
            "privacyStatus": "public"
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
    try:
        youtube = get_authenticated_service()
        video_id = upload_video(youtube, file, title, description, category, tags)
        return {"success": True, "video_id": video_id}
    except Exception as e:
        traceback.print_exc()
        return {"success": False, "error": str(e)}
    