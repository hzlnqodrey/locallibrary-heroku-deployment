const Author = require('../models/author')
const Book = require('../models/book')
const async = require('async')

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
exports.author_create_get = (req, res) => {
    res.send('Author Create Get')
}

// Handle Author create form on POST.
exports.author_create_post = (req, res) => {
    res.send('Author Create Post')
}

// Display Author delete form on GET.
exports.author_delete_get = (req, res) => {
    res.send('Author Delete Get')
}

// Handle Author delete form on POST.
exports.author_delete_post = (req, res) => {
    res.send('Author Delete Post')
}

// Display Author Update form on GET.
exports.author_update_get = (req, res) => {
    res.send('Author Update Get')
}

// Handle Author Update form on POST.
exports.author_update_post = (req, res) => {
    res.send('Author Update Post')
}