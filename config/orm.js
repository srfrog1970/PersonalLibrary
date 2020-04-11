var connection = require("./connection.js");

// Object Relational Mapper (ORM)
// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

class ORM {
  constructor(connection) {
    this.connection = connection;
  }

  printQuestionMarks(numberOfValuesOrColumns, type) {
    const questionMarks = [];
    for (var i = 0; i < numberOfValuesOrColumns; i++) {
      if (type === "cols") {
        questionMarks.push("??");
      } else {
        questionMarks.push("?");
      }
    }
    return questionMarks.join(", ");
  }
  // return orm.innerJoin(booksCols, "books", "authors", "id", "authorid");
  innerJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    // 'SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorsId'
    const queryString = `SELECT ${this.printQuestionMarks(
      colsToSelect.length,
      "cols"
    )} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;
    return this.connection.query(queryString, [
      ...colsToSelect,
      tableOne,
      tableTwo,
      tableOne,
      tableOneCol,
      tableTwo,
      tableTwoCol,
    ]);
  }

  innerJoinWhere(
    colsToSelect,
    tableOne,
    tableTwo,
    tableOneCol,
    tableTwoCol,
    whereTable,
    whereCol,
    whereVal
  ) {
    const queryString = `SELECT ${this.printQuestionMarks(
      colsToSelect.length,
      "cols"
    )} FROM ?? INNER JOIN ?? ON ??.?? = ??.?? WHERE ??.??=?`;
    var inserts = [
      ...colsToSelect,
      tableOne,
      tableTwo,
      tableOne,
      tableOneCol,
      tableTwo,
      tableTwoCol,
      whereTable,
      whereCol,
      whereVal,
    ];

    return this.connection.query(queryString, [
      ...colsToSelect,
      tableOne,
      tableTwo,
      tableOne,
      tableOneCol,
      tableTwo,
      tableTwoCol,
      whereTable,
      whereCol,
      whereVal,
    ]);
  }

  create(table, columns, values) {
    const queryString = `INSERT INTO ?? (${columns.join(
      ", "
    )}) VALUES (${this.printQuestionMarks(values.length)})`;
    return this.connection.query(queryString, [table, ...values]);
  }

  delete(table, col, value) {
    const queryString = "DELETE FROM ?? WHERE ??=?";

    return this.connection.query(queryString, [table, col, value]);
  }
}
module.exports = new ORM(connection);
// const test = new ORM(connection);
// test
//   .innerJoin(
//     ["firstName", "lastName", "title", "coverPhoto"],
//     "authors",
//     "books",
//     "id",
//     "authorId"
//   )
//   .then((results) => console.log(results))
//   .catch((err) => console.log(err));
