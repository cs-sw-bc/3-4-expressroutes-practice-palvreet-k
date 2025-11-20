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
  res.json(result.posts);
});

app.get('/posts/:userId', (req, res) => {
  let userid = Number(req.params.userId);
  let allposts = insta.posts;
  let result =null;
  result = allposts.find((post)=>post.userId == userid);

  if(result){
    //result is not null
    res.json(result);
  }else{
    //404
    res.status(404).send("The user you are looking for doesnot exist");
  }
});