const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const dotenv = require("dotenv");
const {connection} = require('./configs/db') ;
const { transcribeAudio } = require('./transcribeUtil')
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }))


const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({ storage : storage });
// Create a directory to store video files
const videosDir = './videos';
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

let currentFileId = 1; 

app.post('/stop-recording', upload.single('recording'),   (req, res) => {
   
        try {
          let currentFileName = `video-${currentFileId++}.webm`;
      
          // Check if a file was uploaded
          const uploadedFile = req.file.buffer;
          if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
      
          // Handle the uploaded file (e.g., write it to disk)
          const filePath = path.join(videosDir, currentFileName);
          console.log(filePath)
          const videoStream = fs.createWriteStream(filePath);
          videoStream.write(uploadedFile, async (err) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error appending data to the video file' });
            } else {
               const transcription = await transcribeAudio(fs.createReadStream(filePath), 'webm')
              res.status(200).json({ message: 'File received and transcribed successfully', transcription });
            }
          });
        } catch (error) {
          res.status(500).json({ message: error.message });
          console.error(error);
        }      
});

// ... Other endpoints remain the same
// connection(process.env.MONGO_URL)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
