var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
var Post = require('../models/post')

chai.use(chaiHttp)

var tour = {title: 'post title', url: 'https://www.google.com', summary: 'post summary', subreddit: 'post subreddit'}

describe('Posts', function() {
    it('should create with valid attributes at POST /photos', function(done) {
        Post.findOneAndRemove(tour, function() {
            //how many tours are there now?
            Post.find(function(err, tours) {
                var tourCount = tours.length
                chai.request('localhost:3000')
                .post('/posts', tour)
                .end(function (err, res) {
                    //check database for one more tour
                    Post.find(function(err, tours) {
                        tourCount.should.be.equal(tours.length)

                        //check response is successful
                        res.should.have.status(200)
                        done()
                    })
                })
            })
        })
    })
})
