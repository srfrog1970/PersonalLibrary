// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

class Notes {
  addBookNote(note, bookId) {
    var addBookNoteCol = ["note", "bookId"];
    var addBookNoteVal = [note, bookId];
    return orm.create("notes", addBookNoteCol, addBookNoteVal);
  }

  deleteNote(noteId) {
    return orm.delete("notes", "id", noteId);
  }
}

module.exports = new Notes();
