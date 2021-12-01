const express = require("express");
const router = express.Router();
const client = require("../db/conn");
const ObjectID = require("mongodb").ObjectID;

const database = "zettabyte_blog";
const table = "comments";

/* GET comments listing. */
router.get("/", async function (req, res) {
  client.connect().then((client) => {
    const db = client.db(database);
    const collection = db.collection(table);

    collection
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching comments!");
        } else {
          res.json(result);
        }
      });
  });
});

router.post("/", async function (req, res) {
  client.connect().then((client) => {
    const db = client.db(database);
    const collection = db.collection(table);
    const data = {
      article_id: req.body.article_id,
      text: req.body.text,
    };

    collection.insertOne(data, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting comments!");
      } else {
        res
          .status(204)
          .send(`Added a new article with id ${result.insertedId}`);
      }
    });
  });
});

router.put("/update/:id", async function (req, res) {
  client.connect().then((client) => {
    const db = client.db(database);
    const collection = db.collection(table);
    const id = { _id: new ObjectID(req.params.id) };

    const data = {
      $set: {
        article_id: req.body.article_id,
        text: req.body.text,
      },
    };

    collection.updateOne(id, data, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating comments with id ${id}!`);
      } else {
        res.status(204).send("1 document updated");
      }
    });
  });
});

router.delete("/:id", async function (req, res) {
  client.connect().then((client) => {
    const db = client.db(database);
    const collection = db.collection(table);
    const id = { _id: new ObjectID(req.params.id) };

    collection.deleteOne(id, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting comments with id ${id}!`);
      } else {
        res.status(204).send("1 document deleted");
      }
    });
  });
});

module.exports = router;
