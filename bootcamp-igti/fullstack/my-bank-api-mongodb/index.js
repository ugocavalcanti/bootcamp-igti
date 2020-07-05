const express = require("express");
const mongoose = require("mongoose");
const accountRouter = require("./routes/account.js")
const winston = require("winston");

const { combine, timestamp , label, printf } = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-bank-api.log"})
    ],
    format: combine (
        label({ label: "my-bank-api"}),
        timestamp(),
        myFormat
    )
});
const app = express();

(async () => {
    try{
        await  mongoose.connect("mongodb+srv://<user>:<password>@<name_cluster>.snyy3.gcp.mongodb.net/bank?retryWrites=true&w=majority", 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.use(express.json());
        app.use("/account", accountRouter);

        app.listen(3000, () => console.log("API conected!"));
    } catch (error) {
        console.log("Could not connect to DB."+ error)
    }
  })();
