# ScreenRecorderApi
An API that receives data in chunks(Blob) from frontend and transcribes with deepgrams speech to text SDK
On uploading a .webm file, a video.wbm file is generated in the videos directory, then the path to the directory is fed to the deepgram API for translation 
Yet to serve the webm file to the frontend because of the recent deadline..but that's not an issue really :grinning:
## Endpoints

### Stop Recording
- **Endpoint:** `https://screenrecorderapi-cmbl.onrender.com/stop-recording`
- **HTTP Method:** `POST`
- **Request Format:**
  Use a formdata on your API testing tool and set the fieldname to recording and input any .webm video file
 
- **Response Format:**
  ```json
  {
  "message": "File received and transcribed successfully",
  "transcription": "WEBVTT\n\nNOTE\nTranscription provided by Deepgram\nRequest Id: da34f369-71b2-4cc2-9492-d09044769c23\nCreated: 2023-10-02T10:54:21.285Z\nDuration: 
   117.71787\nChannels: 
   1\n\n00:00:17.210 --> 00:00:18.590\nYou're not paying attention.\n\n00:00:20.090 --> 00:00:21.550\nI just want to answer\n\n00:00:21.930 --> 00:00:22.750\nthe phone.\n\n00:00:23.369 
   --> 
   00:00:25.950\nEmail, look, but I mean, listen.\n\n00:00:28.595 --> 00:00:30.535\nYou have to learn to listen.\n\n00:00:31.954 --> 00:00:33.415\nThis is not some game.\n\n00:00:34.035 
    -- 
   > 00:00:37.020\nYou I mean, we we could easily die\n\n00:00:37.020 --> 00:00:37.920\nout here.\n\n00:00:38.620 --> 00:00:39.440\nBut listen.\n\n00:00:40.300 --> 00:00:42.480\nListen 
   to 
   the sounds of the machine.\n\n00:00:46.735 --> 00:00:48.114\nListen to your breathing.\n\n00:01:55.512 --> 00:01:57.612\nWell, don't you ever get tired of this?\n"
  }
![Screenshot (74)](https://github.com/kofman10/ScreenRecorderApi/assets/64756234/7b492ffe-a041-4769-ac83-ada39c7dfe0e)
