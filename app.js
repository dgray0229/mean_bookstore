var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),

    Genre = require('./models/genre'),
    Book = require('./models/books');

mongoose.connect('mongodb://localhost/MEAN_Bookstore');
var db = mongoose.connection;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World');
});

// Genres
app.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
        if (err) throw err;
        res.json(genres);
    });
});

app.post('/api/genres', function (req, res) {
    var genre = req.body;
    Genre.addGenre(genre, function (err, genre) {
        if (err) throw err;
        res.json(genre);
    });
});

// Books
app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) throw err;
        res.json(books);
    });
});

app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
});

app.post('/api/books', function (req, res) {
    var book = req.body;
    Genre.addBook(book, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
});


app.listen(3000);
console.log('Running on port 3000');