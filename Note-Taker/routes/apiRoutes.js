const router = require("express").Router();
const store = require("../db/store.js");

// Route
router.get("/notes", function(req, res) {
    // 500 Error Message = Internal Server Error
    store.getNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post("/notes", function (req, res) {
    // Remember: the middleware in server.js grants access to req.body
    store.addNote(req.body).then(note => res.json(note)).catch(err => res.status(500).json(err));
});

// Parameter path syntax employs use of colon (:), req.params
router.delete("/notes/:id", function(req, res) {
    // ok: true for front end purposes
    store.removeNote(req.params.id).then(() => res.json({ok: true})).catch(err => res.status(500).json(err));
});

module.exports = router;