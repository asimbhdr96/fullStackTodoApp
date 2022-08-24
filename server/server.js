const express = require('express')
const todoDB = require('./database');
const app = express()
const port = 4000
const cors = require('cors')


const QUERY = {
  GET_ALL: "Select * from todos",
  GET_BY_ID: function (id) {
    return `Select * from todos where id = ${id}`;
  },
  EDIT_BY_ID: function (id, content) {
    return `Update todos set content = "${content}" where id = ${id}`;
  },
};

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

app.get("/todos", (req, res) => {
  todoDB.query(QUERY.GET_ALL, (err, data) => {
    res.send(data);
  });
});

app.get("/todos/:id", (req, res) => {
  todoDB.query(QUERY.GET_BY_ID(req.params.id), (err, data) => {
    res.send(data);
  });
});

app.post("/todos", (req, res) => {
  const input = req.body.content;
  todoDB.query(`INSERT INTO todos (content) VALUES("${input}")`, (err, data) => {
    res.send({
      id: data.insertId,
      content: input,
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  todoDB.query(`delete from todos where id=${req.params.id}`, (err, data) => {
    res.send({
      message: "success delete",
    });
  });
});

app.patch("/todos/:id", (req, res) => {
  todoDB.query(
    QUERY.EDIT_BY_ID(req.params.id, req.body.content, (err, data) => {
      res.send({
        id: data.insertId,
        content: req.body.content,
      });
    })
  );
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});
