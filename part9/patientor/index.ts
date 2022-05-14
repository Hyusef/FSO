import express from "express";
import bodyParser from "body-parser";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";


/* 
Create a type Diagnose and use it to create endpoint 
/api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named 
directories and files.

Note that diagnoses may or may not contain the field latin. 
You might want to use optional properties in the type definition. 
*/


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
