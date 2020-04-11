// const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

// app.listen(PORT, () => {
//   console.log(`App listening on PORT: ${PORT}`)
// });
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
const booksRoutes = require("./controllers/booksController.js");
const notesRoutes = require("./controllers/notesController.js");
const htmlRoutes = require("./controllers/htmlController.js");

app.use(booksRoutes);
app.use(notesRoutes);
app.use(htmlRoutes);

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});
