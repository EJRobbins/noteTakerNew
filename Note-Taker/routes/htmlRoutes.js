// Dependencies
const path = require("path");
const router = require("express").Router();

// Join path from /notes to notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// Join path from * to index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

module.exports = router;