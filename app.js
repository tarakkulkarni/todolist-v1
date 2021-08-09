const express=require("express");
const app=express();

const bodyParser=require("body-parser");

let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

app.use(bodyParser.urlencoded({ extended:"true"} ));
app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",function(req,res)
{
  let today=new Date();

  let options={
    weekday: "long",
    day: "numeric",
    month:"long"

  };

  let day=today.toLocaleDateString("en-IN",options);

  res.render("list",{
    listTitle: day,
    newListItems: items
  });
});

app.post("/",function(req,res)
{
  let item=req.body.newItem;
  if(req.body.list==="Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",function(req,res)
{
  res.render("list",{
    listTitle:"Work List",
    newListItems:workItems
  });
});
app.listen(3000,function()
{
  console.log("Server started on port 3000");
});
