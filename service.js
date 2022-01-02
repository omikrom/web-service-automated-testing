const express = require('express');
const cors = require('cors');
const service = express();
const userDB = require("./models/user.js");
const e = require('express');
const port = 1339;

service.use(express.json());
service.use(express.urlencoded({extended:true}));

let corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders:"Authorization, Origin, Content-Type, Accept, X-Requested-With",
	maxAge: 0
};

service.use(cors(corsOptions));

service.get('/', (req,res) => {
	res.send("Welcome!");
});

service.get('/hi', (req,res) => {
	res.send("Hello!");
});

service.get('/hello/:name', (req,res) => {
	res.send(`Hello ${req.params.name}`);
});

service.get('/error', (req,res) => {
	res.status(403).end();
});


service.post('/user', async (req, res) => {
    await userDB.Insert({
          Username: req.body.Username,
          Password: req.body.Password,
          Name: req.body.Name,
		  Email: req.body.Email,
		  Created: new Date()
     }, res);
});

service.get('/users', async (req, res) => {                                            
	if(typeof req.query.name === "string")
	{
		await userDB.SelectByName(req.query.name, res);
	}
	else
	{
		await userDB.Select(res);
	}
});

service.get('/users/:id', async (req, res) => {
	await userDB.SelectById(parseInt(req.params.id), res);
});

service.patch('/users/:id', async (req, res) => {
	await userDB.Patch({
		Id: parseInt(req.params.id),
		Username: req.body.username,
		Password: req.body.password,
		Name: req.body.name,
		Email: req.body.email
	}, res);
});	

service.delete('/user/:id', async (req, res) => {
    await userDB.Delete(parseInt(req.params.id), res);
});






service.post('/post', async (req, res) => {
    await userDB.Insert({
          Creator: req.body.Username,
		  Title: req.body.Title,
		  Content: req.body.Content,
		  Created: new Date()
     }, res);
});

service.get('/posts', async (req, res) => {
	if(typeof req.query.id === "int")
	{
		await userDB.SelectById(parseInt(req.query.id), res);
	} else {
		await userDB.Select(res);
	}
});

service.listen(port, () => console.log(`Web service listening at http://localhost:${port}`));