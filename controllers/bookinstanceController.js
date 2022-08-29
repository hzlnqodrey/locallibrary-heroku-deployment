const BookInstance = require('../models/bookinstance')

// Display list of all BookInstances.
exports.bookinstance_list = (req, res, next) => {

    BookInstance.find()
        .populate('book')
        .exec( function (err, bookinstance_result) {
            if ( err ) { return next(err) }

            // Succesfull, so render
            res.render('bookinstance_list', {
                title: 'Book Instance List',
                bookinstance_list: bookinstance_result
            })
        })

}

// Display detail page for a specific BookInstance
exports.bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err, bookinstance) => {
            if (err) { return next(err) }

            if (bookinstance == null) {
                const err = new Error("Bookinstance not found")
                err.status = 404
                return next(err)
            }

            res.render('bookinstance_detail', {
                title: bookinstance.book.title,
                bookinstance
            })
        })
}

// Display BookInstance create form on GET.
exports.bookinstance_create_get = (req, res) => {
    res.send('BookInstance Create Get')
}

// Handle BookInstance create form on POST.
exports.bookinstance_create_post = (req, res) => {
    res.send('BookInstance Create Post')
}

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = (req, res) => {
    res.send('BookInstance Delete Get')
}

// Handle BookInstance delete form on POST.
exports.bookinstance_delete_post = (req, res) => {
    res.send('BookInstance Delete Post')
}

// Display BookInstance update form on GET.
exports.bookinstance_update_get = (req, res) => {
    res.send('BookInstance update Get')
}

// Handle BookInstance update form on POST.
exports.bookinstance_update_post = (req, res) => {
    res.send('BookInstance update Post')
}

