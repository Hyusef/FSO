const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send(phonebook);
});

app.get("/info", (req, res) => {
  res.write(`<p>Phoneboook has info for ${phonebook.length} people</p> \n`);
  const date = new Date();
  res.write(date.toString());
  res.end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = phonebook.find((ele) => ele.id === id);
  console.log(phonebook);
  if (person) {
    res.json(person);
  } else {
    res.status(404);
    res.write("<h1>ERROR 404 COULD NOT BE FOUND</h1>");
    res.end();
  }
});

app.get("/api/persons/", (req, res) => {
  res.json(phonebook);
});

app.post("/api/persons/", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const id = Math.round(Math.random() * 2000);
  if (name == undefined || number == undefined) {
    res.send("Error: There has to be both a number and a name");
    return;
  }
  const nameArr = [];
  phonebook.forEach((el) => {
    nameArr.push(el.name.toLowerCase());
  });

  if (nameArr.includes(name)) {
    res.send(`${name} is already in the phonebook`);
    return;
  }

  const personObj = {
    id: id,
    name: name,
    number: number,
  };

  phonebook.push(personObj);
  console.log(phonebook);
  res.write("success");
  1;
  res.end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((note) => note.id !== id);
  res.send("deleted");
  res.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});


