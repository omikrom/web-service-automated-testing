const express = require('express');
const {Client, Connection} = require('pg');
const format = require('pg-format');

let data = [];

async function CreateUser(req, res) {
    console.log(`Adding a new user: ${req.body.username}`);
    try {
        let ID = GenerateID();
        let date = new Date();
        let userInput = {};
        userInput = ({ 
                        id : ID,
                        name: req.body.username,
                        password: req.body.password,
                        name: req.body.name,
                        email: req.body.email,
                        created: date
                        });
        console.log(userInput);
        data.push(userInput);
        res.status(201).send(userInput);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('User created');
        res.status(201)
    }
}


async function SelectUserByID(iD, res) {
    console.log(`Reading user details by ID: ${iD}`);
    try {
        let id = iD;
        let user = data.filter(user => user.id == id);
        console.log(user);
        res.status(200).send(user);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('User selected');
        res.status(200)
    }

}
 
function GenerateID() {
    let total = 0;
    for(let i = 0; i < data.length; i++) {
        total += 1;
    }
    console.log(total);
    if (data.length <= 0) {
        return 0;
    } else {
        return total;
    }   
}

module.exports = { CreateUser, SelectUserByID };