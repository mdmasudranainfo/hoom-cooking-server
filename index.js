const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());

// mongodb file

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ybk3ec.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const serviceCollection = client.db("home-cookin").collection("service");

const run = () => {
  try {
    // 3 service
    app.get("/service3", async (req, res) => {
      const query = {};
      const cursor = await serviceCollection.find(query).limit(3);
      const result = await cursor.toArray();
      res.send(result);
    });

    // services
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = await serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // single service
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = await serviceCollection.findOne(query);

      res.send(cursor);
    });
  } finally {
  }
  //
  //
};
run();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
