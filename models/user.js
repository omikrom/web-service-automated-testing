const express = require('express');
const { Client, Connection } = require('pg');
const format = require('pg-format');
//---------------------------------------------------------------------------------------------------------------------
function GetClient() {
    return new Client({
        host: "postgres", // Service name in docker-compose
        port: 5432,
        user: "docker",
        password: "password",
        database: "mydb"
    });
}

Insert = async(user, res) => {
    let client = GetClient();
    console.log(`Adding a new user named ${user.Username}`);
    try {
        await client.connect();
        console.log(user);
        let query = format('INSERT INTO "User"("Username", "Password", "Name", "Email", "Created") VALUES(%L, %L, %L, %L, %L)  RETURNING *',
            user.Username,
            user.Password,
            user.Name,
            user.Email,
            user.Created);
        let results = await client.query(query);

        if (results.rowCount > 0) {
            console.log('New user record added');
            res.status(201).send(results.rows[0]);
        } else {
            res.status(409).end();
        }
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    } finally {
        await client.end();
    }

};

Select = async(res) => {
    let client = GetClient();
    console.log(`Reading all users details`);
    try {
        await client.connect();

        let query = 'SELECT * FROM "User"';
        let results = await client.query(query);

        if (results.rows.length > 0)
            console.log(`Read ${results.rows.length} records`)
        else
            console.log(`Database is empty`);

        res.send(results.rows);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    } finally {
        await client.end();
    }
};

SelectById = async(id, res) => {
    let client = GetClient();
    console.log(`Looking for user with id ${id}`);
    try {
        await client.connect();

        let query = format('SELECT * FROM "User" WHERE "Id"=%L', id);
        let results = await client.query(query);

        if (results.rows.length > 0) {
            console.log(`Found ${results.rows.length} records`);
            res.send(results.rows[0]);
        } else {
            console.log(`Record not found for Id=${id}`);
            res.status(409).end();
        }
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    } finally {
        await client.end();
    }
};

SelectByName = async(name, res) => {
    let client = GetClient();
    console.log(`Show all users named:  ${username}`);
    try {
        await client.connect();

        let query = format('SELECT * FROM "User" WHERE "Name"=%L', username);
        let results = await client.query(query);

        if (results.rows.length > 0)
            console.log(`Found ${results.rows.length} records`);
        else
            console.log(`Records not found for ${name}`);

        res.status(200).send(results.rows);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    } finally {
        await client.end();
    }
};

Delete = async(id, res) => {
    let client = GetClient();
    console.log(`Delete user with id = ${id}`);
    try {
        await client.connect();

        let query = format('DELETE FROM "User" WHERE "Id"=%L', id);
        let results = await client.query(query);

        if (results.rowCount > 0) {
            console.log('Record deleted');
            res.send({});
        } else {
            console.log(`Failed to delete record for Id = ${id}`);
            res.status(409).end();
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        await client.end();
    }
};

Patch = async(user, res) => {
    let client = GetClient();
    console.log(`Modifying the user with Id = ${user.Id}`);
    try {
        //let query: string = 'UPDATE "Student" SET ';
        let queryArgs = [];
        let values = [];
        await client.connect();
        if (user.Username != null) { values.push(user.Username);
            queryArgs.push('"Username"=%L'); }
        if (user.Password != null) { values.push(user.Password);
            queryArgs.push('"Password"=%L'); }
        if (user.Email != null) { values.push(user.Email);
            queryArgs.push('"Email"=%L'); }
        if (user.Name != null) { values.push(user.Name);
            queryArgs.push('"Name"=%L'); }
        values.push(user.Id); // Id of record to change

        let query = format.withArray('UPDATE "User" SET ' + queryArgs.join(",") + ' WHERE "Id"=%L',
            values);
        let results = await client.query(query);

        if (results.rowCount > 0) {
            console.log('Modified the record');
            res.send({});
        } else {
            console.log(`Failed to modify record for Id = ${user.Id}`);
            res.status(409).end();
        }
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    } finally {
        await client.end();
    }
};

module.exports = { Insert, Select, SelectById, SelectByName, Delete, Patch };