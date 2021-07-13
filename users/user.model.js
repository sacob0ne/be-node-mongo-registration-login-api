// The user model uses Mongoose to define the schema for the users collection saved in MongoDB. 
// The exported Mongoose model object gives full access to perform CRUD (create, read, update, delete) 
// operations on users in MongoDB, see the user service below for examples.

// schema.set('toJSON', { ... }); configures which user properties are included when converting MongoDB 
// records to JSON objects which are returned in API responses.

// virtuals: true includes the Mongoose virtual id property which is a copy of the MongoDB _id property.
// versionKey: false excludes the Mongoose version key (__v).
// transform: function (doc, ret) { ... } removes the MongoDB _id property and password hash so they are 
// not included in API responses.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);