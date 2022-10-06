const express                   = require('express')
const router                    = express.Router()

// Import/Require Controller modules.
const author_controller         = require('../controllers/authorController')
const book_controller           = require('../controllers/bookController')
const bookinstance_controller   = require('../controllers/bookinstanceController')
const genre                     = require('../controllers/genreController')

// ----------------------------------------------------------------------------

// AUTHOR ROUTES //

    // GET request for creating Author. 
    // NOTE This must come before route for id (i.e. display author).
    router.get('/author/create', author_controller.author_create_get)

    // POST request for creating Author.
    router.post('/author/create', author_controller.author_create_post)

    // GET request for delete Author.
    router.get('/author/:id/delete', author_controller.author_delete_get)

    // POST request for delete Author.
    router.post('/author/:id/delete', author_controller.author_delete_post)

    // GET request for update Author.
    router.get('/author/:id/update', author_controller.author_update_get)

    // POST request for update Author.
    router.post('/author/:id/update', author_controller.author_update_post)

    // GET request for one author
    router.get('/author/:id', author_controller.author_detail)

    // GET request for list of all authors
    router.get('/authors', author_controller.author_list)

// BOOK ROUTES //
    
    // GET catalog home page
    router.get('/', book_controller.index) //This actually maps to /catalog/ because we import the route with a /catalog prefix

    // GET request for creating Book.
    router.get('/book/create', book_controller.book_create_get)

    // POST request for creating Book.
    router.post('/book/create', book_controller.book_create_post)

    // GET request for delete Book.
    router.get('/book/:id/delete', book_controller.book_delete_get)

    // POST request for delete Book.
    router.post('/book/:id/delete', book_controller.book_delete_post)

    // GET request for update Book.
    router.get('/book/:id/update', book_controller.book_update_get)

    // POST request for update Book.
    router.post('/book/:id/update', book_controller.book_update_post)

    // GET request for one book
    router.get('/book/:id', book_controller.book_detail)

    // GET request for list of all books
    router.get('/books', book_controller.book_list)

// BOOK INSTANCE ROUTES //

    // GET request for creating Book Instance.
    router.get('/bookinstance/create', bookinstance_controller.bookinstance_create_get) 

    // POST request for creating Book Instance.
    router.post('/bookinstance/create', bookinstance_controller.bookinstance_create_post)

    // GET request for deleting Book Instance.
    router.get('/bookinstance/:id/delete', bookinstance_controller.bookinstance_delete_get)

    // POST request for deleting Book Instance.
    router.post('bookinstance/:id/delete', bookinstance_controller.bookinstance_delete_post)

    // GET request for updating Book Instance.
    router.get('/bookinstance/:id/update', bookinstance_controller.bookinstance_update_get)

    // POST request for updating Book Instance.
    router.post('bookinstance/:id/update', bookinstance_controller.bookinstance_update_post)

    // GET request for one Book Instance.
    router.get('/bookinstance/:id', bookinstance_controller.bookinstance_detail)

    // GET request for list of all Book Instances.
    router.get('/bookinstances', bookinstance_controller.bookinstance_list)

// GENRE ROUTES //

    // GET request for creating Genre
    router.get('/genre/create', genre.genre_create_get)

    // POST request for creating Genre
    router.post('/genre/create', genre.genre_create_post)

    // GET request for deleting Genre
    router.get('/genre/:id/delete', genre.genre_delete_get)

    // POST request for deleting Genre
    router.post('/genre/:id/delete', genre.genre_delete_post)

    // GET request for updating Genre
    router.get('/genre/:id/update', genre.genre_update_get)

    // POST request for updating Genre
    router.post('/genre/:id/update', genre.genre_update_post)

    // GET request for one Genre
    router.get('/genre/:id', genre.genre_detail)

    // GET request for list of all Genres
    router.get('/genres', genre.genre_list)

module.exports = router