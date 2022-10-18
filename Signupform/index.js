var express = require("express")
var bodyparser= require("body-parser")
var mongoose= require("mongoose")


const app= express()
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db= mongoose.connection;

db.on('error',()=>console.log("Error in connecting To Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Data inserted successfully!");
    })
    return res.redirect('LOGIN.html');

    
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect (ElderlyHelper.html)
}).listen(3000);

console.log("Listening on port 3000");



// app.post("/LoginForm",async(req,res)=>{
//     try {
//      const email= req.body.email;
//      const password= req.body.password;
//      const useremail= await mydb.findOne({email:email});
 
//      res.send(useremail);
//      console.log(user)
 
 
//     } catch (error) {
//      res.status(400).send("Invalid Email")
//     }
//  })


