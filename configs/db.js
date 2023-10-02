const mongoose = require("mongoose");


const connection = (url) => {
   const connect = mongoose.connect(url);

    connect
      .then(() => {
        console.log("db connected");
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = { connection }