// Dependencies
const express = require("express");
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE filtering Client-Server communication (req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Making Public Folder Static (Make Server Check Here First)
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Listening for Requests
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));

// THIS IS WANTED