var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved']},
        due_date: {type: Date, default: Date.now},
    }
);

// Virtual for author's full name
BookInstanceSchema
.virtual('url')
.get(() => `/catalog/bookinstance/${this._id}`);

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
