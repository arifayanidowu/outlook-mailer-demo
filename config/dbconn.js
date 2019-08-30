const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true
  })
  .then(_ => console.log(`[MongoDB]: Connected to database successfully...`))
  .catch(err =>
    console.log(`[Error]: Failed to establish a connection to the database`)
  );
