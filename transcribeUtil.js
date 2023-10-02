const dotenv = require("dotenv");
const { Deepgram } = require("@deepgram/sdk");
// const Video = require("./models/transcript");

dotenv.config()

const deepgram = new Deepgram(process.env.DEEPGRAM_KEY);

const transcribeAudio = async (video, mimetype) => {
    const source = {
        buffer: video,
        mimetype: mimetype,
      };
      // Send the audio to Deepgram and get the response
      try {
        const response = await deepgram.transcription.preRecorded(source, {
          smart_format: true,
          punctuate: true,
	      utterances: true,
          model: 'nova',
        });
        const webvttTranscript = response.toWebVTT();
        return webvttTranscript.toString() ;
      } catch (error) {
        console.log(error);
      }
}

module.exports = { transcribeAudio }