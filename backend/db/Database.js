const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      /*       useNewUrlParser: true,
      useUnifiedTopology: false, */
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;