const express = require("express");
const gradesRouter = require("./grades/grades.js");

const app = express();

app.use(express.json());
app.use("/grades", gradesRouter);

app.listen(3000, () => console.log("API Starded"));