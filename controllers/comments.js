var Comment = require('../models/comment')

module.exports = function(app) {

    //POST(create) new comment
    app.post('/posts/:postId/comments', function (req, res) {
        //new instance of comment model
        var comment = new Comment(req.body)

        //save instance to DB
        comment.save(function (err, comment) {
            console.log(comment)
            return res.redirect('/')
        })
    })
}
