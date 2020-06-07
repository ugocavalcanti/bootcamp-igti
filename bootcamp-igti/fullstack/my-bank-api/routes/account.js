const express = require("express");
const fs = require("fs").promises;
const fileName = "account.json"

const router = express.Router();

router.post("/", async (req, res) =>{
    logger.info("Starting post account...")
    try {
        let account = req.body;
        let data = await fs.readFile(fileName, "utf8");

        let accountJson = JSON.parse(data);
        account.id = accountJson.nextId++;
        accountJson.accounts.push(account);
        
        await fs.writeFile(fileName, JSON.stringify(accountJson)); 

        res.send("Account created with sucesss.");     
        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`Post /account - ${err.message}`);
    }
});

router.delete("/:id", async (req, res) => {
    try{
        let idAccount = req.params.id;
        let data = await fs.readFile(fileName, "utf8");
        let accountJson = JSON.parse(data);
        
        let indexAccount = accountJson.accounts.findIndex((item) => item.id == idAccount);
        if (indexAccount  === -1) {
            throw new Error("Account not found.")
        }

        accountJson.accounts.splice(indexAccount, 1);
    
        await fs.writeFile(fileName, JSON.stringify(accountJson));
        res.send("Account deleted with sucesss.");
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`DELETE /account - ${err.message}`);
    }
});

router.get("/", async (_, res) => {
    try {
        let data = await fs.readFile(fileName, "utf8")
        let accounts = JSON.parse(data).accounts;
        res.send(accounts);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`GET /account - ${err.message}`);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let idAccount = req.params.id;
        let data = await fs.readFile(fileName, "utf8");
        let accounts = JSON.parse(data).accounts;
        
        let account = accounts.find(item => item.id == idAccount)
        if (account === undefined) {
            throw new Error(`Account number ${idAccount} not found.`)
        }               
         
        res.send(account);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`GET /account/:id - ${err.message}`);
    }
});

router.put("/", async (req, res) =>{
    try {
        let accountBody = req.body;
        let data = await fs.readFile(fileName, "utf8");
        let accountJson = JSON.parse(data) ;
        
        let indexAccount = accountJson.accounts.findIndex((item) => item.id == accountBody.id);
        if (indexAccount  === -1) {
            throw new Error("Account not found.")
        }

        if (accountBody.name !== undefined){
            accountJson.accounts[indexAccount].name = accountBody.name;
        }
        if (accountBody.balance !== undefined){
            accountJson.accounts[indexAccount].balance = accountBody.balance
        }

        await fs.writeFile(fileName, JSON.stringify(accountJson));

        res.send("Account updated with sucesss.");
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PUT /account - ${err.message}`);
    }
});

router.put("/draw", async (req, res) => {
    try {
        let accountBody = req.body;
        if (accountBody.value <= 0) {
            throw new Error("Valor menor ou igual a 0 não aceito.");
        }

        let data = await fs.readFile(fileName, "utf8")
        let accountJson = JSON.parse(data) ;
        let indexAccount = accountJson.accounts.findIndex((item) => item.id == accountBody.id);
            
        if (indexAccount  === -1) {
            throw new Error("Account not found.")
        }
        if (accountJson.accounts[indexAccount].balance - accountBody.value < 0) {
            throw new Error("Insuficient balance.")
        }
        accountJson.accounts[indexAccount].balance -= accountBody.value
        
        await fs.writeFile(fileName, JSON.stringify(accountJson));
                 
        res.send("Account updated with sucesss.");
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PUT /account/draw - ${err.message}`);
    }
   
});

router.put("/deposit", async (req, res) => {
    try {
        let accountBody = req.body;
        if (accountBody.value <= 0) {
            throw new Error("Valor menor ou igual a 0 não aceito.");
        }

        let data = await fs.readFile(fileName, "utf8");
        let accountJson = JSON.parse(data) ;
       
        let indexAccount = accountJson.accounts.findIndex((item) => item.id == accountBody.id);  
        if (indexAccount  === -1) {
            throw new Error("Account not found.")
        }
        accountJson.accounts[indexAccount].balance += accountBody.value
    
        await fs.writeFile(fileName, JSON.stringify(accountJson));
                   
        res.send("Account updated with sucesss.");
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PUT /account/deposit - ${err.message}`);
    }
});

module.exports = router;