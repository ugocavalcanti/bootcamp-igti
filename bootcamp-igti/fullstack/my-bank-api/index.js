const express = require("express");
const fs = require("fs").promises;
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

const fileName = "account.json";

const app = express();

app.use(express.json());
app.use("/account", accountRouter);

app.listen(3000, async () => {
    try {
        await fs.readFile(fileName, "utf8") 
        logger.info("API Started!");
    } catch(err){
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        fs.writeFile(fileName, JSON.stringify(initialJson), err => console.log(err));
    }

});
