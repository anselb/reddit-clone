var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CommentSchema = new Schema({
    content: { type: String, required: true },
    comments: [ this ],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    post: { type: String, required: true }
})

//CommentSchema.add({comments: [ CommentSchema ]})

module.exports = mongoose.model('Comment', CommentSchema)
