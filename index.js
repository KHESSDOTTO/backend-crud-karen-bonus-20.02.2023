import express from "express";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());
app.listen(8080, () => {
  console.log("Up and running on localhost port 8080.");
});

let data = [];

app.get("/all", (req, res) => {
  return res.status(200).json(data);
});

app.post("/create", (req, res) => {
  const newEntry = { ...req.body, id: uuid() };
  data.push(newEntry);
  return res.status(201).json(newEntry);
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((cE) => cE.id === id);
  data.splice(index, 1, { ...req.body, id: id });
  const modEntry = data.find((cE) => cE.id === id);
  return res.status(202).json(modEntry);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const index = data.findIndex((cE) => cE.id === id),
    delEntry = data.find((cE) => cE.id === id);
  data.splice(index, 1);
  return res.status(202).json(delEntry);
});

// ---------------------------------------------------------------------------------------------------------------

app.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const reqEntry = data.find((cE) => cE.id === id);
  return res.status(200).json(reqEntry);
});

app.put("/addComment/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((cE) => cE.id === id);
  let reqEntry = data.find((cE) => cE.id === id);
  const entryComments = reqEntry.comments;
  const { newComment } = req.body;
  entryComments.push(newComment);
  reqEntry = data.find((cE) => cE.id === id);
  return res.status(202).json(reqEntry);
});

app.get("/status/open", (req, res) => {
  const response = data.filter((cE) => cE.status === "Em andamento");
  return res.status(200).json(response);
});

app.get("/status/close", (req, res) => {
  const response = data.filter((cE) => cE.status === "Finalizado");
  return res.status(200).json(response);
});
