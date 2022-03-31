const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true})); 


app.get("/", function(req,res){

    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
	  
	  const email  = req.body.email;
	  const name1 = req.body.name1;
	  const name2 = req.body.name2;

	 const  data ={
	  	members:[
             {
             	email_address:email,
             	status:"subscribed",
                merge_fields:{
                	FNAME:name1,
                	LNAME:name2
                }
             }
	  	]
	  }
        const jsondata = JSON.stringify(data)

        const url="https://us14.api.mailchimp.com/3.0/lists/913200e3ee";
        
        const options ={
        	method:"POST",
        	family: 4,
        	auth:"neha:4e933759ec5866c1c37f59f1e9a01c10-us14"
        }
       const request =  https.request(url,options,function(response)
        	{

        		response.on("data",function(data){
        			console.log(JSON.parse(data));
        		});
        	});
       
       //app.use(express.static('./public'));

       if(request.statusCode == 200)
       {
             res.sendFile(__dirname+"/sucess.html");
       
       }else
       {
          res.sendFile(__dirname+"/failure.html");
       }

       request.write(jsondata);
       request.end();

       
       

});
  
app.post("/failure",function(req,res){
     res.redirect("/");
});
app.listen(process.env.PORT || 3000);

//api kay 
// 4e933759ec5866c1c37f59f1e9a01c10-us14

// list id :913200e3ee
// mailchaimp account username: __neha__
// password : Pass@12345