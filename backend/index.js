require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());

const router = require("./routes/v1/index.routes");

// app.use(cors({
//      "origin": "*",
//      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//      "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept",
//      "credentials": true,
// }));

app.options('/v1', cors({"Origin": "*"}))

app.use("/v1", router);

app.listen(process.env.PORT, () => {
     console.log("server is running on", process.env.PORT);
});

const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@cluster0.csro34v.mongodb.net/yellowclass?retryWrites=true&w=majority`;

mongoose
     .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
     .then(() => {
          console.log("Mongo Server has been connected");
     })
     .catch((e) => {
          console.log(e);
     });
