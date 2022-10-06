const Author    = require('../models/author')
const Book      = require('../models/book')
const async     = require('async')

// Validator
const { body, validationResult } = require('express-validator')

// Display list of all Authors.
exports.author_list = (req, res, next) => {
    
    Author.find()
        // Sort by family name - ascending
        .sort([['family_name', 'ascending']])
        .exec(function(error, authorlist_result) {
            if (error) { return next(error) }

            res.render('author_list', {
                title: 'Author List',
                list_author: authorlist_result
            })
        })

}

// Display detail page for a specific Author.
exports.author_detail = (req, res, next) => {
    async.parallel({
        author(callback) {
            Author.findById(req.params.id).exec(callback)
        },

        author_books(callback) {
            Book.find({ 'author' : req.params.id }).exec(callback)
        }
    },
    (err, results) => {
        if (err) { return next(err) }

        // If there is no correspondence author that user's request, so throw error
        if (results.author == null) {
            const err = new Error("Author not found")
            err.status = 404
            return next(err)
        }

        res.render('author_detail', {
            title: results.author.name,
            author: results.author,
            author_books: results.author_books
        })
    })
}

// Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
    res.render('author_form', {
        title: "Create Author"
    })
}

// Handle Author create form on POST.
exports.author_create_post = [
    // Validation & Sanitization
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First Name must be specified.")
        .isAlphanumeric()
        .withMessage("First Name has non-alphanumeric characters."),

    body("family_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Family Name must be specified.")
        .isAlphanumeric()
        .withMessage("Family Name has non-alphanumeric characters."),

    body("date_of_birth", "Invalid date of birth")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),

    body("date_of_death", "Invalid date of death")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),

    // Process Data
    (req, res, next) => {
        
        const errors = validationResult(req)

        if ( !errors.isEmpty() ) {
            // If there was an error, render the error to client-side
            res.render('author_form', {
                title: "Create Author",
                author: req.body,
                errors: errors.array()
            })

            return
        }

        // Data Form is Valid, so process it

        // Create New Author Object after validation and sanitization
        const author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        })

        author.save((err) => {
            if ( err ) {
                return next(err)
            }

            res.redirect(author.url)
        })
    }
]

// Display Author delete form on GET.
exports.author_delete_get = (req, res, next) => {
    async.parallel({
        author(callback) {
            Author.findById(req.params.id).exec(callback)
        },

        author_books(callback) {
            Book.find( { author: req.params.id }).exec(callback)
        }
    },
    (err, results) => {
        if ( err ) {
            return next(err)
        }

        if ( results.author == null ) {
            // No results of author
            res.redirect('/catalog/authors')
        }

        res.render('author_delete', {
            title: "Delete Author",
            author: results.author,
            author_books: results.author_books
        })
    })
}

// Handle Author delete form on POST.
exports.author_delete_post = (req, res, next) => {
    async.parallel({
        author(callback) {
            Author.findById(req.body.authorid).exec(callback)
        },

        author_books(callback) {
            Book.find({ author: req.body.authorid }).exec(callback)
        }
    },
    (err, results) => {
        if ( err ) {
            return next(err)
        }
        
        // Success

        // Author has books. Render in same way as for GET route.
        if (results.author_books.length > 0) {
            
            res.render("author_delete", {
                title: "Delete Author",
                author: results.author,
                author_books: results.author_books
            })

            return
        }

        // Author has no books. Delete object and redirect to the list of authors.
        Author.findByIdAndRemove(req.body.authorid, (err) => {
            if ( err ) {
                return next(err)
            }

            // Success - go to author list
            res.redirect("/catalog/authors")
        })
    })
}

// Display Author Update form on GET.
exports.author_update_get = (req, res) => {
    res.send('Author Update Get')
}

// Handle Author Update form on POST.
exports.author_update_post = (req, res) => {
    res.send('Author Update Post')
}