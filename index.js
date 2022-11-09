const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

// mongodb file

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ybk3ec.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const serviceCollection = client.db("home-cookin").collection("service");
const reviewCollection = client.db("home-cookin").collection("review");

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
    // post review......
    app.post("/review", async (req, res) => {
      const riview = req.body;

      const cursor = await reviewCollection.insertOne(riview);
      res.send(cursor);
    });
    //get review servicesID........
    app.get("/review", async (req, res) => {
      let query = {};
      if (req.query.serviceID) {
        query = { serviceID: req.query.serviceID };
      }
      const cursor = await reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //get review email........
    app.get("/reviews", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const cursor = await reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // delete
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // end.................
  } finally {
  }
  //
  //
};
run();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
