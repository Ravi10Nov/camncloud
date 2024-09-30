const express = require('express');

const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const submitScore = require('./routers/score');
const leaderboard = require('./routers/leaderBoard');

app.use('/',submitScore);
app.use('/',leaderboard);

app.listen(4500,()=>{
    console.log('App is running at port 4500')
})






















// {
//     "dependencies": {
//       "express": "^4.21.0",
//       "mysql": "^2.18.1",
//       "nodemon": "^3.1.7"
//     }
//   }