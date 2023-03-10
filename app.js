const express = require("express");

const bodyparser = require("body-parser");

const app = express();

const request = require("request");
const https = require("https");

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));


app.get('/',function(req,res) {
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstname,
                    LNAME : lastname,
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/YOUR_ID";

    const options = {
        method: "POST",
        auth : "pritam:YOUR_API_KEY",
    }

    const request = https.request(url,options,function(response) {
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data",function(data){
        //     // console.log(JSON.parse(data));
        // })
       
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function() {
    console.log("The Server Is running on the Port 3000...........")
})





