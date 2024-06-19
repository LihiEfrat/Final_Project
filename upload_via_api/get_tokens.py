# Authenticate manually with the Google account for the videos uploading and save the credentials.
# prompt to log in to the Google account you want to use for uploads and save the credentials to "credentials.json".
# account: physioproject24@gmail.com
# password: physio24@ 
# 

import json
import google_auth_oauthlib.flow

CLIENT_SECRETS_FILE = "upload_via_api\client_secret.json"
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]

def get_tokens():
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, SCOPES)
    credentials = flow.run_local_server(port=0)
    with open("upload_via_api\credentials.json", "w") as f:
        json.dump({
            "token": credentials.token,
            "refresh_token": credentials.refresh_token,
            "token_uri": credentials.token_uri,
            "client_id": credentials.client_id,
            "client_secret": credentials.client_secret,
            "scopes": credentials.scopes
        }, f)

if __name__ == "__main__":
    get_tokens()
