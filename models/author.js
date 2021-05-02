var mongoose = require('mongoose');
const { DateTime } = require("luxon");


var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, require: true, maxLength: 100},
        family_name: {type: String, require: true, maxLength: 100},
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

// Virtual for formatting date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED): '';
});

// Virtual for formatting date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED): '';
});

// Virtual for author's life span
AuthorSchema
.virtual('lifespan')
.get(function() {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

// Virtual for author's id
AuthorSchema
.virtual('url')
.get(() => `/catalog/author/${this._id}`);

module.exports = mongoose.model('Author', AuthorSchema);
