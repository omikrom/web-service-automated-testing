let data = [];

async function CreateUser(req, res) {
    console.log(`Adding a new user: ${req.body.username}`);
    if (req.body.username == undefined) {
        console.log('no body');
        res.status(400).send('no content');
    } else {
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
                            created: date,
                            status: "Successful"
                            });
            console.log(userInput);
            data.push(userInput);
            res.status(201).send(userInput);
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        } finally {
            console.log('request ended');
            res.end();
        }
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
        console.log('request ended');
        res.end();  
    }
}

async function SelectUserByName(username, res) {
    console.log(`Reading user details by name: ${username}`);
    try {
        let name = username;
        let user = data.filter(user => user.name == name);
        console.log(user);
        res.status(200).send(user);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function SelectAllUsers(res) {
    console.log(`Reading all users`);
    try {
        res.status(200).send(data);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function UpdateUser(id, req, res) {
    console.log('Updating user by ID: ' + id);
    try {
        let user = data.filter(user => user.id == id);
        user[0].name = req.body.username;
        user[0].password = req.body.password;
        user[0].name = req.body.name;
        user[0].email = req.body.email;
        console.log(user);
        res.status(200).send(user);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function DeleteUser(id, res) {
    console.log(`Deleting user by ID: ${id}`);
    try {
        let user = data.filter(user => user.id == id);
        data.splice(data.indexOf(user), 1);
        console.log(user);
        res.status(200).send(user);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
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

module.exports = { CreateUser, SelectUserByID, SelectUserByName, SelectAllUsers, DeleteUser };