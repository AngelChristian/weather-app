const fetch = require('node-fetch');
require('dotenv').config();
exports.getWeather =  (req,res)=>{
    res.render('index',{
    city: null,
    des: null,
    icon: null,
    temp: null,
    wind:null,
    hum:null,
    key: process.env.PLACE_API_KEY
  }); 
};

exports.postWeather = async(req,res)=>{
    const city = req.body.city;
    console.log(city);
    
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_API_KEY}`;
     try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'City Not Found') {
            console.log('error');
            
          res.render('index', {
            city: data.message,
            des: "Please Try Again",
            icon: null,
            temp: null,
            wind:null,
            hum:null,
            key: process.env.PLACE_API_KEY,

          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = (data.main.temp - 273).toPrecision(4);
          const wind = data.wind.speed;
          const hum = data.main.humidity;
          const key = process.env.PLACE_API_KEY;
            console.log(temp);
            

          res.render('index', {
            city, des, icon, temp,wind,hum,key
          });
        }
      });

  } catch (err) {
    res.render("index", {
      city: "something wrong",
      des: "Please Try Again",
      icon: null,
      temp: null,
      wind: null,
      hum: null, 
      key: process.env.PLACE_API_KEY,
    });
  }


    
}