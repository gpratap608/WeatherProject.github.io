const express = require("express");

const https = require("https");

const app = express();

const bodyParser = require("body-parser");
const { STATUS_CODES } = require("http");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");  
    
    })

app.post("/",function(req,res){
    var cityName = req.body.cityName;

    const appid = "3545f3c4d6c8aaa60258aac3f51b0024";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appid+"&units=metric";
    https.get(url,function(response){
           console.log(response.statusCode);
            response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp =weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/"+image+"@2x.png";
            console.log(des);
            console.log(temp);
            res.write("<h1>"+cityName+"</h1>");
            res.write("<h3>Weather Will be " + des +" here </h3>");
            res.write("<h3>Temperature is "+temp+" </h3>");
            res.write("<img src="+imageurl+">");
            res.send();
       })
    })
})



app.listen(3000 ,function(){
    console.log('server started at port 3000.');
});