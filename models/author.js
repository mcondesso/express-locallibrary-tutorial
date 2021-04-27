var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, require: true, maxLength: 100},
        last_name: {type: String, require: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function() {
    return this.family_name + ', ' + this.first_name;
});

// Virtual for author's full name
AuthorSchema
.virtual('lifespan')
.get(function() {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for author's full name
AuthorSchema
.virtual('url')
.get(() => `/catalog/author/${this._id}`);

module.exports = mongoose.model('Author', AuthorSchema);
