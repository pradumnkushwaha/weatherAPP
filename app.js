const express = require('express');
const app = express();
const https = require('https');
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.get('/', function (req, res) {

  res.sendFile(__dirname+"/index.html");
 
});


app.post('/',function(req,res)
{
  
 const cityName = req.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=c684913466428c537c2161c901ab94d1&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const wdata = JSON.parse(data);
      const tempdata = wdata.main.temp;
      const description = wdata.weather[0].description;
      const icon = wdata.weather[0].icon;

      

      res.write("The weather is currently "+description);
      res.write(" The temperature in "+cityName+" is "+tempdata+"  degree celcius  ");
      //const icon_url ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      

    //  res.write("<img src="+icon_url+">");
      res.send();
      
    });
  });
  // console.log(req.body.city);
});

app.listen(3000, function () {
  console.log(`Example app listening on port 3000`);
}); 