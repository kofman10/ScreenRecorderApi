const mongoose = require("mongoose");

const transcriptSchema = new mongoose.Schema(
  {
    transcipt: {
        type: String
    },
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("Video", transcriptSchema);