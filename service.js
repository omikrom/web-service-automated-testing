const express = require('express');
const cors = require('cors');
const service = express();
const userModel = require("./models/userModel.js");
const postModel = require("./models/postModel.js");
const port = process.env.PORT || 1339;


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


			/////////////////
			//             //
			// User routes //
			//             //
			/////////////////

// create a user
service.post('/createuser', async (req, res) => { 
	await userModel.CreateUser(req, res);
});

// get all users
service.get('/users', async (req, res) => {
	await userModel.SelectAllUsers(res);
});

//get a user by id in url
service.get('/user/:id', async (req, res) => {
	await userModel.SelectUserByID(parseInt(req.params.id), res);
});

service.patch('/user/:id', async (req, res) => {
	await userModel.UpdateUserByID(parseInt(req.params.id), req, res);
});	

//get user by name ?name=rich
service.get('/user', async (req, res) => {                                          
	if(typeof req.query.username === "string")
	{
		await userModel.SelectUserByName(req.query.username, res);
	}
	else
	{
		res.status(400).send("Invalid query");
	}
});

//delete a user by id
service.delete('/user/:id', async (req, res) => {
    await userModel.DeleteUser(parseInt(req.params.id), res);
});

//////////////////////////////
//                          //
//       Post routes        //
//                          //
//////////////////////////////

//create post 
service.post('/createpost', async (req, res) => {
	await postModel.CreatePost(req, res);
});

//create comment from post id
service.post('/post/:id/comment', async (req, res) => {
	await postModel.CreateComment(parseInt(req.params.id), req, res);
});

//get post by id
service.get('/post/:id', async (req, res) => {
	await postModel.SelectPostByID(parseInt(req.params.id), res);
});

// get all comments of post
service.get('/post/:id/comments', async (req, res) => {
	await postModel.SelectAllCommentsByPostID(parseInt(req.params.id), res);
});

//get posts by query title or creator
service.get('/posts', async (req, res) => {
	if (typeof req.query.title === "string") {
		await postModel.SelectPostByTitle(req.query.title, res);
	} else {
		if (typeof req.query.creator === "string") {
			await postModel.SelectPostsByCreator(req.query.creator, res);
		} else {
			res.status(400).send("Invalid query");
		}
	}
	
});

//delete post by id
service.delete('/post/:id', async (req, res) => {
	await postModel.DeletePostByID(parseInt(req.params.id), res);
});

//delete comment from post by id
service.delete('/post/:postid/comment/:id', async (req, res) => {
	await postModel.DeleteCommentByID(parseInt(req.params.postid), parseInt(req.params.id), res);
});


service.listen(port, () => console.log(`Web service listening at http://localhost:${port}`));