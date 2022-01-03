const express = require('express');
const {Client, Connection} = require('pg');
const format = require('pg-format');

let data = [];

async function CreateUser(req, res) {
    console.log(`Adding a new user: ${req.body.username}`);
    try {
        let newID = LastID();
        let date = new Date();
        let userInput = {};
        userInput = ({ 
                        id : 1,
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
 
function LastID() {
    for(let i = 0; i < data.length; i++) {
        console.log(i);
    }
    //return data.id;
    
}

module.exports = { CreateUser, SelectUserByID };