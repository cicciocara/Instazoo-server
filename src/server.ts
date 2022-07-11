import express from "express";
import "dotenv/config";

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Tutt appost ciru");
});

app.listen(port);
