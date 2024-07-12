const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const router = require("./Src/Routes/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
const uri = process.env.MONGO;

// Connexion à MongoDB
mongoose.connect(uri)
.then(() => {
  console.log('MongoDB Connected…');
})
.catch(err => console.log(err));

app.use('/', router);


app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
