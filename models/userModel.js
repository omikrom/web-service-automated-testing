let data = [];
// *
async function CreateUser(req, res) {
    console.log(`Adding a new user: ${req.body.username}`);
    try {
        let ID = GenerateID();
        let date = new Date();
        let userInput = {};
        userInput = ({
            id: ID,
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            created: date
        });
        data.push(userInput);
        res.status(201).send(userInput);
    } catch (error) {
        res.status(400).send(error);
    } finally {
        res.end();
    }
}


async function SelectUserByID(id, res) {
    console.log(`Reading user details by ID: ${id}`);
    let found = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let user = data.filter(user => user.id == id);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        } finally {
            res.end();
        }
    } else {
        res.status(404).send("User id not found");
    }
}

async function SelectUserByName(username, res) {
    console.log(`Reading user details by name: ${username}`);
    let found = false
    for (let i = 0; i < data.length; i++) {
        if (data[i].username == username) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let user = data.filter(user => user.username == username);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        } finally {
            res.end();
        }
    } else {
        res.status(404).send("User name not found");
    }
}

async function SelectAllUsers(res) {
    console.log(`Reading all users`);
    try {
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    } finally {
        res.end();
    }
}

async function UpdateUserByID(id, req, res) {
    console.log('Updating user by ID: ' + id);
    let found = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    data[i].username = req.body.username;
                    data[i].password = req.body.password;
                    data[i].name = req.body.name;
                    data[i].email = req.body.email;
                    res.status(200).send(data[i]);
                }
            }
        } catch (error) {
            res.status(400).send(error);
        } finally {
            res.end();
        }
    } else {
        res.status(404).send("User id not found");
    }
}

async function DeleteUser(id, res) {
    console.log(`Deleting user by ID: ${id}`);
    let found = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let user = data.filter(user => user.id == id);
            data.splice(data.indexOf(user), 1);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        } finally {
            res.end();
        }
    } else {
        res.status(404).send("User id not found");
    }
}

function GenerateID() {
    return data.length + 1;
}

module.exports = { CreateUser, SelectUserByID, SelectUserByName, SelectAllUsers, DeleteUser, UpdateUserByID };