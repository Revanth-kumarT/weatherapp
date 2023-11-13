const express=require('express');
const https=require('https');

const app=express();
const bodyparser=require('body-parser')

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
   

    res.sendFile(__dirname + "/index.html");

})

app.post('/',(req,res)=>{

    const query=req.body.cityname
const apikey='643dba5f7e08a4fef97928f9d38f0208'
const url='https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+apikey+'&units=metric'
https.get(url,(response)=>{
   // console.log(response.statusCode);

   response.on('data',(data)=>{
   //console.log(data);
   

   const temp_data=JSON.parse(data);
   const temperature=temp_data.main.temp;
   res.write("<h1> temperature in "+query+" is "+ temperature +"celsius </h1>");

   })
}) 

})



app.listen(5000,()=>console.log("server is running is at port 5000"))
