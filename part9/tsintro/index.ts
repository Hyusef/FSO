import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import bodyParser from "body-parser";
import { exerciseCalculator } from "./exerciseCalculator";
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/hello", (_req, res) => {
  res.send("hello");
});

app.get("/bmi", (_req, res) => {
  console.log(_req.query.height);
  console.log(_req.query.weight);
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({
      error: "malformatted parameters",
    });
    res.end();
  } else {
    const answer = calculateBmi(height, weight);
    res.json({ answer: answer });
  }
});

app.post("/post", (req, res) => {
  const { value1, value2 } = req.body;
  console.log(req.body);
  if (!Array.isArray(value1) || isNaN(value2)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  

  const result = exerciseCalculator(value1, value2);
  res.json(result);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
