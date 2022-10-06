const Genre                      = require('../models/genre')
const Book                       = require('../models/book')
const async                      = require('async')

// Validator
const { body, validationResult } = require('express-validator')

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
exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', {
        title: "Create Genre"
    })
}

// Handle Genre create form on POST.
exports.genre_create_post = [
    // Validate and sanitize the name field.
    body("name", "Genre name required")
        .trim() // to delete (if is there) the first whitespace and the last whitespace
        .isLength({ min: 1 }) // to check whether string value is minimal 1 
        .escape(), // to remove HTML characters from the variable that might be used in JavaScript cross-site scripting attacks.

    // HTTP Response | Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req)

        // Create a genre object with escaped and trimmed data.
        const genre = new Genre({ name : req.body.name })

        if ( !errors.isEmpty() ) {
            // There are errors, Render the form again with sanitized values/error messages.
            res.render("genre_form", {
                title: "Create Genre",
                genre,
                errors: errors.array(),
            })

            return
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({ name: req.body.name }).exec(( err, found_genre) => {
                if ( err ) {
                    return next(err)
                }

                if ( found_genre ) {
                    // Genre already exists. redirect to its detail page
                    res.redirect(found_genre.url)
                } else {
                    // Genre is new data, store it on the database
                    genre.save((err) => {
                        if ( err ) {
                            return next(err)
                        }
                        
                        // Genre is added. redirect to its detail page
                        res.redirect(genre.url)
                    })
                }
            })
        }
    }
]

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
