const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: enableVideo,
        audio: enableAudio,
      });
      setMediaStream(stream);
      const recordedChunks = [];
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      setMediaRecorder(recorder);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };
      recorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        // Send the blob data to the server
        const formData = new FormData();
        formData.append("recording", blob, "recording.webm");
        try {
          const response = await fetch(BACKEND_API_ENDPOINT, {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            console.log("Video upload successful");
          } else {
            console.error("Video upload failed");
          }
        } catch (error) {
          console.error("Error sending video data:", error);
        }
        setIsRecording(false);
      };
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };