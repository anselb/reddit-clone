var express = require('express')
var exphbs = require('express-handlebars')
var path = require('path')
var methodOverride = require('method-override')
var app = express()
var bodyParser = require('body-parser')
var Post = require('./models/post')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

require('./controllers/posts.js')(app)
require('./controllers/comments.js')(app)

//GET reddit index
app.get ('/', function (req, res) {
    Post.find().exec(function (err, posts) {
        res.render('posts-index', {posts: posts})
    })
})

app.get('/n/:subreddit', function (req, res) {
    Post.find({ subreddit: req.params.subreddit }).exec(function (err, posts) {
        res.render('posts-index', {posts: posts})
    })
})

app.listen(3000, function() {
    console.log('Reddit clone listening on port 3000!')
})
