import express from "express";
import insta from "./data/insta.json" with {type:"json"};



const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/users', (req, res) => {
  let result = {...insta};
  res.json(result.users);
});

app.get('/users/:id', (req, res) => {
  let userId = Number(req.params.id);
  let allusers = insta.users;
  let result =null;
  result = allusers.find((user)=>user.id == userId);

  if(result){
    //result is not null
    res.json(result);
  }else{
    //404
    res.status(404).send("The user you are looking for doesnot exist");
  }
});

app.get('/posts', (req, res) => {
  let result = {...insta};
  let resultposts = result.posts;
  
  //Query Parameters
  if(req.query.hashtag){
    let hashtag = req.query.hashtag;
    resultposts = resultposts.filter((post) => post.hashtags.includes(hashtag));
  }

  if(req.query.minLikes){
    resultposts = resultposts.filter((post)=> post.likes >= Number(req.query.minLikes))
  }
  if(req.query.user){
    let resultuserid = null;
    resultuserid = result.users.find((user) => user.username == req.query.user).id;
    resultposts = resultposts.find((post)=> post.userId == resultuserid);
  }

  res.json(resultposts);
});

app.get('/posts/:id', (req, res) => {
  let postId = Number(req.params.id);
  let allposts = insta.posts;
  let result =null;
  result = allposts.find((post)=>post.id == postId);

  if(result){
    //result is not null
    res.json(result);
  }else{
    //404
    res.status(404).send("The Post id you are looking for doesnot exist");
  }
});

app.get('/posts/:id/comments', (req, res) => {
  let postId = Number(req.params.id);
  let allposts = insta.posts;
  let result =null;
  result = allposts.find((post)=>post.id == postId);

  if(result){
    //result is not null
    res.json(result.comments);
  }else{
    //404
    res.status(404).send("The Post comments you are looking for doesnot exist");
  }
});

app.get('/posts/:id/comments/:commentId', (req, res) => {
  let postId = Number(req.params.id);
  let commId = Number(req.params.commentId)
  let allposts = insta.posts;
  let resultpost =null;
  let resultcomment = null;
  resultpost = allposts.find((post)=>post.id == postId);

  if(resultpost){
    //Postresult is not null, then filter by commentId
    resultcomment = resultpost.comments.find((comment) =>comment.id == commId)
    if(resultcomment){
    res.json(resultcomment);}
  else{
    //Comment result is null 404
    res.status(404).send("The comments you are looking for doesnot exist");
  }
}
else{
    //Post result is null 404
    res.status(404).send("The post you are looking for doesnot exist");
  }

});



