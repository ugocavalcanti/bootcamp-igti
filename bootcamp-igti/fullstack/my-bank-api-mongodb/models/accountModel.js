const mongoose = require("mongoose");

const accountModel = mongoose.Schema({
    agencia: {
        type: Number,
        required: true
    },
    conta: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        validate: (valor) => {if (valor < 0)  throw new Error("Insufficient balance");}
    }
});

module.exports = mongoose.model("accounts", accountModel);