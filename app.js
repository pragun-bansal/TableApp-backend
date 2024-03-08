
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// require('./config/passport.js')
const path = require('path');
const routes = require("./routes/TableRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({ origin: `${process.env.FRONT_END_URL}`, credentials: true }));


app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.use("/api",routes);


app.use(express.static(path.join(__dirname, 'views','build')));
app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'views','build','index.html')));


app.listen(PORT, () => {
  console.log(`Server is connected on port: ${PORT}`);
});
