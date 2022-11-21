const mongoose = require("mongoose");

const dbConnetion = () => {
  // process.env.DB_URL ||
  const { DB_URL } = process.env;
  const SERVER = DB_URL;
  mongoose
    .connect(SERVER, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB CONNECTED SUCESSFULLY`))
    .catch((error) => {
      console.log(`DB CONNECTION ISSUE ${error}`);
      process.exit(1);
    });

  mongoose.connection.on("error", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = dbConnetion;
