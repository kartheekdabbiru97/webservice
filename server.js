const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const auth = require("./app/middleware/auth")
const app = express();

var StatsD = require('node-statsd'),
sdc = new StatsD();

const log = require("./log4js")
const logger = log.getLogger('log4js');

global.__basedir = __dirname;

var corsOptions = {
    origin : "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(
    bodyParser.raw({ limit: '50mb', type: ['image/*'] })
);
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true}));
const db = require("./app/models");
db.sequelize.sync();
// to get all
global.username;
app.get("/v1", (req, res) => {
    res.json( {message: "welcome to user database"});
})



require("./app/routes/user.routes")(app);
//port

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info("[INFO]: Server is running on port 3000");
})

app.get("/healthz", (req, res, next) => {
    logger.info("[INFO]: /healthz api endpoint is called");
    sdc.increment('sdc_healthz'); //statsd counter metric
    res.json("You have reached the /healthz endpoint");
    res.status(200);
   });