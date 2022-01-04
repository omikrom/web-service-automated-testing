let posts = [];

async function CreatePost(req, res) {
    console.log(req.body);
    //console.log(`Creating a new post by: ${req.body.username}`);
    try {
        let ID = GenerateID();
        let date = new Date();
        let post = {};
        post = ({ 
                        postID : ID,
                        title: req.body.title,
                        content: req.body.content,
                        created: date,
                        creator: req.body.creator,
                        comments : []
                        });
        console.log(post);
        posts.push(post);
        res.status(201).send(post);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        res.end();
    }
}

async function CreateComment(id, req, res) {
    console.log(`Creating a new comment by: ${req.body.username}`);
    try {
        let ID = GenerateCommentID(id);
        let date = new Date();
        let comment = {};
        comment = ({ 
                        commentID : ID,
                        content: req.body.content,
                        created: date,
                        creator: req.body.username
                        });
        console.log(comment);
        posts[id].comments.push(comment);
        res.status(201).send(comment);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        res.end();
    }
}

async function SelectPostByID(id, res) {
    console.log(`Reading post details by ID: ${id}`);
    try {
        let postID = id;
        let post = posts.filter(post => post.postID == postID);
        console.log(post);
        res.status(200).send(post);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function SelectAllCommentsByPostID(id,res) {
    console.log(`Reading all comments by ID: ${id}`);
    try {
        let postID = id;
        let post = posts.filter(post => post.postID == postID);
        console.log('found post', post);
        let comments = post[0].comments;
        res.status(200).send(comments);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function SelectPostByTitle(title, res) {
    console.log(`Reading post details by title: ${title}`);
    try {
        let postTitle = title;
        let post = posts.filter(post => post.title == postTitle);
        console.log(post);
        res.status(200).send(post);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function SelectPostsByCreator(creator, res) {
    console.log(`Reading post details by creator: ${creator}`);
    try {
        let postCreator = creator;
        let post = posts.filter(post => post.creator == postCreator);
        console.log(post);
        res.status(200).send(post);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}



async function SelectAllPosts(res) {
    console.log(`Reading all posts`);
    try {
        res.status(200).send(posts);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    } finally {
        console.log('request ended');
        res.end();  
    }
}

async function DeletePost(id, res) {
    console.log(`Deleting post by ID: ${id}`);
    try {
        let postID = id;
        let post = posts.filter(post => post.postID == postID);
        console.log(post);
        posts.splice(postID, 1);
        res.status(200).send({message: 'Post deleted', post});
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
    for(let i = 0; i < posts.length; i++) {
        total += 1;
    }
    console.log(total);
    if (posts.length <= 0) {
        return 0;
    } else {
        return total;
    }   
}

function GenerateCommentID(id) {
    let total = 0;
    for(let i = 0; i < posts[id].comments.length; i++) {
        total += 1;
    }
    console.log(total);
    if (posts[id].comments.length <= 0) {
        return 0;
    } else {
        return total;
    }
}

module.exports = { CreatePost, CreateComment, SelectPostByID, SelectPostByTitle, SelectPostsByCreator, SelectAllCommentsByPostID, SelectAllPosts, DeletePost };