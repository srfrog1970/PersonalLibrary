// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const booksCols = ["books.id", "firstName", "lastName", "title", "coverPhoto"];
class Books {
  getAllBooks() {
    return orm.innerJoin(booksCols, "authors", "books", "id", "authorid");
  }
  getOneBook(name) {
    return orm.innerJoinWhere(
      booksCols,
      "authors",
      "books",
      "id",
      "authorid",
      "books",
      "title",
      name
    );
  }

  getBookNotes(bookTitle) {
    var noteCols = ["notes.id", "note"];
    return orm.innerJoinWhere(
      noteCols,
      "notes",
      "books",
      "bookId",
      "id",
      "books",
      "title",
      bookTitle
    );
  }

  addBook(title, coverPhoto, authorId) {
    var addBookCol = ["title", "coverPhoto", "authorId"];
    var addBookVal = [title, coverPhoto, authorId];
    return orm.create("books", addBookCol, addBookVal);
  }
}

module.exports = new Books();
