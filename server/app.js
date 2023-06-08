const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const dbService = require("./dbService");
const db = new dbService();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/insert", (request, response) => {
  console.log("i am here");
  const todo = request.body;
  db.insertTodo(todo.value);
  const theTodo = db.getTodoByName(todo.value);
  console.log(theTodo);
  theTodo
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});
app.get("/getAll", (request, response) => {
  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const result = db.deleteTodo(id);
  response.json(result);
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
