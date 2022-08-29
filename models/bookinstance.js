const mongoose = require('mongoose')
const { DateTime }  = require('luxon')

const Schema = mongoose.Schema

const BookInstanceSchema = new Schema(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },

        // Reference to associated book
        imprint: {
            type: String,
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: [
                'Available',
                'Maintenance',
                'Loaned',
                'Reserved'
            ],
            default: 'Maintenance'
        },

        due_back: {
            type: Date,
            default: Date.now
        }
    }
)

// Virtual for book instance's url
BookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id
    })

// Virtual for book instance's due_back book formatted
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
    })
module.exports = mongoose.model('BookInstance', BookInstanceSchema)