const router = require('express').Router();
const { getWeather, postWeather } = require("../controllers/weather");

router.get('/', getWeather);

router.post("/", postWeather);


module.exports = router;