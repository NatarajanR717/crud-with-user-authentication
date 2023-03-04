const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./src/student/routes');
const app = express();
const port = 3002;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use("/api/v1/students",studentRoutes);

app.listen(port,() => console.log(`server listening on port ${port}`));