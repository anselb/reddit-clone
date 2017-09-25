var Post = require('../models/post')

module.exports = function(app) {
    
    //POST(create) new post
    app.post('/posts', function (req, res) {
        //create instance of Post model
        var post = new Post(req.body)

        //save instance of post model to DB
        post.save(function (err, post) {
            console.log(post)
            return res.redirect('/posts/' + post._id)
        })
    })

    //GET new post form
    app.get('/posts/new', function (req, res) {
        res.render('posts-new', {})
    })

    //GET specific post
    app.get('/posts/:id', function (req, res) {
        Post.findById(req.params.id).exec(function (err, post) {
            res.render('posts-show', {post: post})
        })
    })

}
