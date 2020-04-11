const express = require("express");
const router = express.Router();

// Import the model to use its database functions.
const notes = require("../models/notes.js");

router.delete("/api/note/:id", (req, res) => {
  notes
    .deleteNote(req.params.id)
    .then(() => res.status(200).json(true))
    .catch((error) => res.status(500).json(error));
});

// Export routes for server.js to use.
module.exports = router;
