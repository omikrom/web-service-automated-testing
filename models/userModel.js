const express = require('express');
const {Client, Connection} = require('pg');
const format = require('pg-format');

let data = {};

async function CreateUser(req, res) {
    console.log(`Adding a new user: ${req.body.Username}`);
    try {
        let userInput = [];
        userInput.push({ id : 1,
                         name: req.body.username,
                         password: req.body.password,
                         name: req.body.name,});
        console.log(userInput);
        data.push(userInput);
        res.status(201).send(userInput);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        res.status(201)
    }
}
 
function LastID() {
    let id = 0;
    for(let i = 0; i < data.length; i++) {
        console.log(i);
    }
    return data.id;
}

module.exports = { };