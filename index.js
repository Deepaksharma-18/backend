let express=require("express");
let app=express();
let port=8080;
let path=require("path");
let {v4:uuidv4}=require("uuid");
let methodOverride=require("method-override");
app.use(methodOverride("_method"))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>console.log(`Listening to the port ${port}`));
let posts=[
    {
        id:uuidv4(),
        username:"Deepak",
        message:"Hare krishna",
    },
    {
        id:uuidv4(),
        username:"Lakhan",
        message:"Jay shree mahakal",
    },
    {
        id:uuidv4(),
        username:"Chintu",
        message:"Radhe Radhe",
    }
]
app.get("/posts",(req,res)=>
{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs");

});
app.post("/posts",(req,res)=>
{
    let id =uuidv4();
    let {username,message}=req.body;
    posts.push({id,username,message});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>
{
    let{id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("detail.ejs",{post});
})
app.get("/posts/:id/edit",(req,res)=>
{
    let{id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    let newmessage=req.body.message;
    let post=posts.find((p)=> id===p.id);
    post.message=newmessage;
    res.redirect("/posts");
    
});
app.delete("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");

})