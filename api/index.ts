import express from "express";
import { connect } from "./src/models";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
