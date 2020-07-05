const express = require("express");
const Account = require("../models/accountModel")

const router = express.Router();

const TAX_WITHDRAWAL = 1;
const TAX_TRANSFER = 8;

router.put("/deposit/:ag/:cc/:valor", async (req, res) => {
    try {
        const agencia = req.params.ag;
        const conta = req.params.cc;
        const valor = parseInt(req.params.valor);
       
        const account = await Account.findOne({agencia: agencia, conta: conta});
        if  (account == null) {
            throw new Error("Account not exist.")
        }
        account.balance += valor;

        await Account.updateOne({_id: account.id}, account);

        res.send("Deposited successfully. Novo Saldo: " + account.balance);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PUT /account/deposit - ${err.message}`);
    }
});

router.put("/withdrawal/:ag/:cc/:valor", async (req, res) => {
    try {
        const agencia = req.params.ag;
        const conta = req.params.cc;
        const valor = parseInt(req.params.valor);
       
        let account = await Account.findOne({agencia: agencia, conta: conta});
        if  (account == null)  throw new Error("Account not exist.");
        if (account.balance < valor)  throw new Error("Insufficient balance.")
        
        account.balance -= valor;
        account.balance -= TAX_WITHDRAWAL;

        await Account.updateOne({_id: account.id}, account);

        res.send("Sucessful withdrawal. New balance: "  + account.balance);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PUT /account/withdrawal - ${err.message}`);
    }
});

router.put("/transfer/:co/:cd/:valor", async (req, res) => {
    try {
        const numContaOrigem = req.params.co;
        const numContaDestino = req.params.cd;
        const valor = parseInt(req.params.valor);
       
        const contaOrigem = await Account.findOne({conta: numContaOrigem});
        if  (contaOrigem == null)  throw new Error("FROM account not exist.");
        const contaDestino = await Account.findOne({conta: numContaDestino});
        if  (contaDestino == null)  throw new Error("TO account not exist.");

        if (contaOrigem.agencia != contaDestino.agencia) {
            if (contaOrigem.balance < (valor + TAX_TRANSFER))  throw new Error("Insufficient balance.");
            contaOrigem.balance -= valor;
            contaOrigem.balance -= TAX_TRANSFER;
        }else {
            if (contaOrigem.balance < valor)  throw new Error("Insufficient balance.");
            contaOrigem.balance -= valor;
        }
        contaDestino.balance += valor;

        await Account.updateOne({_id: contaOrigem.id}, contaOrigem);
        await Account.updateOne({_id: contaDestino.id}, contaDestino);

        res.send("Sucessful transfer. Novo saldo da Conta Origem: " + contaOrigem.balance);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PUT /account/transfer - ${err.message}`);
    }
});

router.get("/balance/:ag/:cc", async (req, res) => {
    try {
        const agencia = req.params.ag;
        const conta = req.params.cc;
       
        let account = await Account.findOne({agencia: agencia, conta: conta});
        if  (account == null)  throw new Error("Account not exist.");

        res.send("Saldo: "+account.balance);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`GET /account/balance - ${err.message}`);
    }
});

router.get("/avg/:ag", async (req, res) => {
    try {
        const agencia = parseInt(req.params.ag);
       
        let accounts = await Account.find({agencia});
        if  (accounts.length == 0)  throw new Error("Agency not exist.");

        const avg = await Account.aggregate([
            {
                $match: {
                    agencia: agencia
                }
            }, 
            {
                $group: {
                    _id: 0,
                    avg: {$avg: "$balance"}
                }
            }
            ]);

        res.send(`Sucessful AVG. Média de saldo agência ${agencia}: ${avg[0].avg}` );
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`GET /account/avg - ${err.message}`);
    }
});

router.get("/lowest/:limit", async (req, res) => {
    try {
        const listLength = parseInt(req.params.limit);
       
        let accounts = await Account.find({}).sort({balance: 1}).limit(listLength);
        if  (accounts.length == 0)  throw new Error("No account exists in the DB");

        res.send(accounts);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`GET /account/lowest - ${err.message}`);
    }
});

router.get("/biggest/:limit", async (req, res) => {
    try {
        const listLength = parseInt(req.params.limit);
       
        let accounts = await Account.find({}).sort({balance: -1}).limit(listLength);
        if  (accounts.length == 0)  throw new Error("No account exists in the DB.");

        res.send(accounts);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`GET /account/biggest - ${err.message}`);
    }
});

router.patch("/transfervips", async (req, res) => {
    try {
        const agencyList = await Account.aggregate([
            {$match: 
                {agencia: 
                    {$ne: 99}
                }
            }
        ]).group({_id: "$agencia"});

        for(var i=0; i <agencyList.length; i++){
            const topOne = await Account.find({ agencia: agencyList[i]._id}).sort({ balance: -1 }).limit(1);

            await Account.findOneAndUpdate({_id: topOne[0].id}, {agencia: 99});
        };

        const vipList = await Account.find({ agencia: 99});
        res.send(vipList);
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`PATCH /account/transfervips - ${err.message}`);
    }
});

router.delete("/:ag/:cc", async (req, res) => {
    try {
        const agencia = req.params.ag;
        const conta = req.params.cc;
       
        let account = await Account.findOne({agencia: agencia, conta: conta});
        if  (account == null)  throw new Error("Account not exist.");

        await Account.findOneAndDelete({agencia: agencia, conta: conta});

        const accountList = await Account.find({agencia: agencia});

        res.send("Sucessful delete. Ainda restam "+accountList.length + " contas nesta agência.");
    } catch (err) {
        res.status(400).send(err.message);
        logger.error(`DELETE /account/delete - ${err.message}`);
    }
});

module.exports = router;