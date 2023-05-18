const express = require("express");

let app = express();

app.use("/",express.static("public"));

app.listen(4000);

console.log("Running in port 4000");