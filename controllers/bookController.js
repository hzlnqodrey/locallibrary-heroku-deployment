const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async')

// Index Site Home Page
exports.index = (req, res) => {
    async.parallel({
        book_count(callback) {
            Book.countDocuments({}, callback)  // Pass an empty object as match condition to find all documents of this collection
        },

        book_instance_count(callback) {
            BookInstance.countDocuments({}, callback)
        },

        book_instance_available_count(callback) {
            BookInstance.countDocuments({status: 'Available'}, callback)
        },

        author_count(callback) {
            Author.countDocuments({}, callback)
        },

        genre_count(callback) {
            Genre.countDocuments({}, callback)
        }
    },
    (err, results) => {
        res.render('index', {
            title: 'Local Library Home',
            error: err,
            data: results
        })
    })
}

// Display list of all books
exports.book_list = (req, res, next) => {
    
    Book.find({}, 'title author')
        .sort({title: 1})
        .populate('author')
        .exec(function (err, list_books) {
            // Succesfull, so render
            res.render('book_list', {
                title: 'Book List',
                book_list: list_books
            })
        })
        
}

// Display detail page for a specific book
exports.book_detail = (req, res, next) => {
    async.parallel({
      book(callback) {
        Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec(callback)
      },

      book_copies(callback) {
        BookInstance.find({ 'book': req.params.id }).sort([['status', 'ascending']]).exec(callback)
      }
    },
    (err, results) => {
        if (err) { return next(err) }

        // No book corespondence with the user request
        if (results.book == null) {
            const err = new Error("No book found")
            err.status = 404
            return next(err)
        }

        res.render('book_detail', {
            title: results.book.title,
            book: results.book,
            book_copies: results.book_copies
        })
    })
}

// Display Book create form on GET
exports.book_create_get = (req, res) => {
    res.send('Book Create Get')
}

// Handle Book create form on POST
exports.book_create_post = (req, res) => {
    res.send('Book Create Post')
}

// Display Book delete form on GET
exports.book_delete_get = (req, res) => {
    res.send('Book delete Get')
}

// Handle Book delete form on POST
exports.book_delete_post = (req, res) => {
    res.send('Book delete Post')
}

// Display Book update form on GET
exports.book_update_get = (req, res) => {
    res.send('Book update Get')
}

// Handle Book update form on POST
exports.book_update_post = (req, res) => {
    res.send('Book update Post')
}