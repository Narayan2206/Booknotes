import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "12345",
  port: 5432,
});
db.connect();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function getBookById(id) {
  const result = await db.query("SELECT * FROM books_read WHERE id = $1;", [id]);
  return result.rows[0];
}

async function selectBy(sortValue){
  let myQuery = "";
  switch(sortValue){
    case "name":
    myQuery = "SELECT * FROM books_read ORDER BY book_title ASC;";
    break;
    case "rating":
    myQuery = "SELECT * FROM books_read ORDER BY rating DESC;";
    break;
    case "date":
    myQuery = "SELECT * FROM books_read ORDER BY date_read DESC;";
    break;
    default:
    myQuery = "SELECT * FROM books_read ORDER BY id ASC;";
  }
   const result = await db.query(myQuery);
   return result.rows;
}

app.get("/", async (req, res) => {

  try {
    const items = await selectBy("rating");
    res.render("index.ejs", {
      books: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/create-notes", (req, res) => {
  res.render("create.ejs");
});

app.get("/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await getBookById(id);
    res.render("notes.ejs", {
      book: item,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/sort-by", async (req, res)=>{
    const sortValue = req.body.sortby;
    try {
      const items = await selectBy(sortValue);
      res.render("index.ejs", {
        books: items,
      });
    } catch (err) {
      console.log(err);
    }
});

app.post("/publish-note", async (req, res) => {
  const title = req.body.booktitle;
  const isbn = req.body.isbn;
  const rating = parseInt(req.body.rating);
  const desc = req.body.description;
  const date = req.body.date;
  const notes = req.body.notes;
  try {
    await db.query("INSERT INTO books_read(book_title, isbn, rating, description , date_read, notes) VALUES($1, $2, $3, $4, $5, $6);", [title, isbn, rating, desc, date, notes]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});

app.get("/edit/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await getBookById(id);
    res.render("create.ejs", {
      book: item,
      message: "Update Notes",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/update/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBookTitle = req.body.booktitle;
  const updatedISBN = req.body.isbn;
  const updatedRating = parseInt(req.body.rating);
  const updatedDate = req.body.date;
  const updatedDescription = req.body.description;
  const updatedNotes = req.body.notes;

  try {
    await db.query("UPDATE books_read SET book_title = $1, isbn = $2, rating = $3, date_read = $4, description = $5, notes= $6 WHERE id = $7;", [updatedBookTitle, updatedISBN, updatedRating, updatedDate, updatedDescription, updatedNotes, id]);
    res.redirect(`/notes/${id}`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/delete/:id", async (req, res)=>{
     const id = parseInt(req.params.id);
     try {
      await db.query("DELETE FROM books_read WHERE id = $1;",[id]);
      res.redirect("/");
     } catch (err) {
      console.log(err);
     }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});