const express = require("express");
const router = express.Router();

// Import the model (cat.js) to use its database functions.
const books = require("../models/books.js");
const notes = require("../models/notes.js");

router.get("/api/books", (req, res) => {
  books
    .getAllBooks()
    .then((results) => res.json(results))
    .catch((error) => res.json(error));
});

router.get("/api/book/:name", (req, res) => {
  const bookName = req.params.name;
  books
    .getOneBook(bookName)

    .then((results) => {
      res.json(results);
    })
    .catch((error) => res.json("nope"));
});

router.get("/api/book/notes/:name", (req, res) => {
  const bookName = req.params.name;
  books
    .getBookNotes(bookName)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => res.status(500).json("NOPE"));
});

router.post("/api/book/new", (req, res) => {
  const { title, coverPhoto, authorId } = req.body;

  books
    .addBook(title, coverPhoto, authorId)
    .then(() => res.status(200).json(true))
    .catch((error) => res.status(500).json(error));
});

router.post("/api/book/note", (req, res) => {
  const { note, bookId } = req.body;

  notes
    .addBookNote(note, bookId)
    .then(() => res.status(200).json(true))
    .catch((error) => res.status(500).json(error));
});

router.delete("/api/note/:id", (req, res) => {
  notes
    .deleteNote(req.params.id)
    .then(() => res.status(200).json(true))
    .catch((error) => res.status(500).json(error));
});

// Export routes for server.js to use.
module.exports = router;
