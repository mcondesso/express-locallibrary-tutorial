var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved']},
        due_date: {type: Date, default: Date.now},
    }
);

// Virtual for bookinstance url
BookInstanceSchema.virtual('url').get(function() {
    return `/catalog/bookinstance/${this._id}`
});

// Virtual for formatting due_date
BookInstanceSchema.virtual('due_date_formatted').get(function () {
    return DateTime.fromJSDate(this.due_date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
