const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')

// Display list of all genre
exports.genre_list = (req, res, next) => {
    
    Genre.find()
        .sort([['name', 'ascending']])
        .exec( function (error, genrelist_result) {
            // If error, return next error [move to next middleware]
            if ( error ) { return next(err) }
            // Success? do render
            res.render('genre_list', {
                title: 'Genre List',
                list_genre: genrelist_result
            })
        })
}

// Display detail page for a specific genre
exports.genre_detail = (req, res, next) => {
    async.parallel({
        genre(callback) {
            Genre.findById(req.params.id).exec(callback)
        },

        genre_books(callback) {
            Book.find({ genre: req.params.id }).exec(callback)
        }
    },
    (err, results) => {
        if (err) {
            return next(err)
        }
        // No results of genres.
        if (results.genre == null) {
            const err = new Error("Genre not found")
            err.status = 404
            return next(err)
        }

        res.render('genre_detail', {
            title: 'Genre Detail',
            genre: results.genre,
            genre_books: results.genre_books
        })
    })
}

// Display Genre create form on GET.
exports.genre_create_get = (req, res) => {
    res.send('Genre Create Get')
}

// Handle Genre create form on POST.
exports.genre_create_post = (req, res) => {
    res.send('Genre Create Post')
}

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
    res.send('Genre delete Get')
}

// Handle Genre delete form on POST.
exports.genre_delete_post = (req, res) => {
    res.send('Genre delete Post')
}

// Display Genre update form on GET.
exports.genre_update_get = (req, res) => {
    res.send('Genre update Get')
}

// Handle Genre update form on POST.
exports.genre_update_post = (req, res) => {
    res.send('Genre update Post')
}
