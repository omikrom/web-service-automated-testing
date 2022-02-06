let posts = [];

async function CreatePost(req, res) {
    console.log(`Creating a new post by: ${req.body.creator}`);
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
        posts.push(post);
        res.status(201).send(post);
    } catch(error) {
        res.status(400).send(error);
    } finally {
        res.end();
    }
}

async function CreateComment(id, req, res) {
    console.log(`Creating a new comment by: ${req.body.creator}`);
    let found = false;
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].postID == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
                let ID = GenerateCommentID(id);
                let date = new Date();
                let comment = {};
                comment = ({ 
                                commentID : ID,
                                content: req.body.content,
                                created: date,
                                creator: req.body.creator
                                });
                posts[id].comments.push(comment);
                res.status(201).send(comment);
            } catch(error) {
                res.status(400).send(error);
            } finally {
                res.end();
            }
    } else {
        res.status(404).send("Post not found");
    }
}

async function SelectPostByID(id, res) {
    console.log(`Reading post details for ID: ${id}`);
    let found = false;
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].postID == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let postID = id;
            let post = posts.filter(post => post.postID == postID);
            res.status(200).send(post);
        } catch(error) {
            res.status(400).send(error);
        } finally {
            res.end();  
        } 
    } else {
        res.status(404).send("Post not found");
    }
}

async function SelectAllCommentsByPostID(id,res) {
    console.log(`Reading all comments by ID: ${id}`);
    let found = false;
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].postID == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let postID = id;
            let post = posts.filter(post => post.postID == postID);
            let comments = post[0].comments;
            res.status(200).send(comments);
        } catch(error) {
            res.status(400).send(error);
        } finally {
            res.end();  
        }
    } else {
        res.status(404).send("Post not found");
    }
}

async function SelectPostByTitle(title, res) {
    console.log(`Reading post details by title: ${title}`);
    let found = false
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].title == title) {
            found = true;
            break;
        }
    }
    console.log('found: ' + found);
    if (found == true) {
        try {
            let postTitle = title;
            let post = posts.filter(post => post.title == postTitle);
            res.status(200).send(post);
        } catch(error) {
            res.status(400).send(error);
        } finally {
            res.end();  
        }
    } else {
            res.status(404).send("Post not found");
    }
}

async function SelectPostsByCreator(creator, res) {
    console.log(`Searching for posts by: ${creator}`);
    let found = false;
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].creator == creator) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let postCreator = creator;
            let post = posts.filter(post => post.creator == postCreator);
            res.status(200).send(post);
        } catch(error) {
            res.status(400).send(error);
        } finally {
            res.end();  
        }
    } else {
        res.status(404).send("Post not found");
    } 
}



async function SelectAllPosts(res) {
    console.log(`Reading all posts`);
    try {
        res.status(200).send(posts);
    } catch(error) {
        res.status(400).send(error);
    } finally {
        res.end();  
    }
}

async function DeletePostByID(id, res) {
    console.log(`Deleting post for post ID: ${id}`);
    let found = false;
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].postID == id) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let postID = id;
            let post = posts.filter(post => post.postID == postID);
            posts.splice(postID, 1);
            res.status(200).send({message: 'Post deleted', post});
        } catch(error) {
            res.status(400).send(error);
        } finally {
            res.end();  
        }
    } else {
        res.status(404).send("Post not found");
    }   
}

async function DeleteCommentByID(postID, id, res) {
    console.log(`Deleting comment by ID: ${id}`);
    let found = false;
    for(let i = 0; i < posts.length; i++) {
        if (posts[i].postID == postID) {
            found = true;
            break;
        }
    }
    if (found == true) {
        try {
            let commentID = id;
            let comment = posts[postID].comments.filter(comment => comment.commentID == commentID);
            console.log(comment);
            posts[postID].comments.splice(commentID, 1);
            res.status(200).send({message: 'Comment deleted', comment});
        } catch(error) {
            console.log(error);
            res.status(400).send(error);
        } finally {
            console.log('request ended');
            res.end();  
        }
    } else {
        res.status(404).send("Post not found");
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

module.exports = { CreatePost, CreateComment, SelectPostByID, SelectPostByTitle, SelectPostsByCreator, SelectAllCommentsByPostID, SelectAllPosts, DeletePostByID, DeleteCommentByID };