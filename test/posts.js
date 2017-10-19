var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
var Post = require('../models/post')
var User = require('../models/user')
var mongoose = require('mongoose')
var expect = chai.expect;

// var agent = chai.request.agent(server)

chai.use(chaiHttp)
mongoose.Promise = global.Promise

it('Should return an array of posts', (done) => {
    Post.find({}).then((posts) => {       // Searches for all Posts
        expect(posts).to.be.an('array');  // Expects posts to be an array
        done();                           // Calls done on a success
    }).catch((err) => {
        done(err);                        // Or call done with an error.
    });
});

// should create a new user
// should check that user is in database

it('Should create a new user', (done) => {
    testUser = new User ({ username: "testUser",
                           password: "testPassword" })
    User.create(testUser).then((user) => {
        expect(user).to.have.property('_id');
        expect(user).to.have.property('username').to.equal('testUser')
        done();
    }).catch((err) => {
        done(err);
    });
});

// should create a new post
// should add post to database
// should check that post is in database

it('Should add a new post', (done) => {
    User.findOne({ username: 'testUser' }).then((user) => {
        var testPost = new Post({ title: "Testxyz",
                              body: "This is a test",
                              url: "https://www.test.com/",
                              subreddit: "Testing",
                              author: user._id })
        return testPost
    }).then((testPost) => {
        return testPost.save()
    }).then((post) => {
        expect(post).to.have.property('_id');
        done();
    }).catch((err) => {
        done(err);
    });
});

// should get post that was created
// should check each post property
// should remove post from database

it('Should fetch a post with valid properties', (done) => {
    Post.findOne({ title: 'Testxyz' }).then((post) => {
        expect(post).to.have.property('body').to.equal("This is a test");
        expect(post).to.have.property('url').to.equal("https://www.test.com/");
        expect(post).to.have.property('subreddit').to.equal("Testing");
        expect(post).to.have.property('author');
        return post._id;
    }).then((postId) => {
        Post.findByIdAndRemove(postId, function (err) {
            return err
        });
        done();
    }).catch((err) => {
        done(err);
    });
});

// should get id of new user
// should find user by that id to see it exists

it('Should find a user with an id', (done) => {
    User.findOne({ username: 'testUser' }).then((user) => {
        expect(user).to.have.property('username').to.equal("testUser");
        return user._id
    }).then((userId) => {
        User.findById(userId, function (err) {
            return err
        })
        done();
    }).catch((err) => {
        done(err);
    });
});

// should get user that was created
// should check that all user properties are valid

it('Should find a user with valid properties', (done) => {
    User.findOne({ username: 'testUser' }).then((user) => {
        expect(user).to.have.property('username').to.equal("testUser");
        expect(user).to.have.property('password')
        expect(user).to.have.property('createdAt');
        expect(user).to.have.property('updatedAt');
        done();
    }).catch((err) => {
        done(err);
    });
});

// should get user id
// should remove user
// check that user is gone

it('Should remove a user', (done) => {
    // var newUser = User({})                  // made new user
    // newUser.save().then((user) => {         // saved user
    //     return User.findById(newUser._id)   // find newUser
    // }).then((user) => {
    //     // is user the newUser?            // ?
    //
    //     return user.remove();              // remove newUser
    // }).then(() => {
    //     //
    //     return User.findById(newUser._id); // find newUser
    // }).then(() => {
    //
    // })
    //
    //
    //
    // User.find({}).then((users)=>{
    //     // expsct an array
    //
    // })
    User.find({}).then((users) => {
        expect(users).to.be.an('array');
        return User.findOneAndRemove({ username: 'testUser' }, function (err) { return err })
    }).then((user) => {
        expect(user).to.have.property('username').to.equal("testUser");
        if (User.findById(user._id) === null) {
            return 'null'
        }
    }).then((user) => {
        expect(user).to.equal(undefined);
        done();
    }).catch((err) => {
        done(err);
    });
});


// before(function (done) {
//     agent
//         .post('/login')
//         .send({ username: 'testone', password: 'password'})
//         .end(function (err, res) {
//             done()
//         })
// })
//
// var post = {title: 'post title', url: 'https://www.google.com', summary: 'post summary', subreddit: 'post subreddit'}
//
// describe('Posts', function() {
//     it('should create with valid attributes at POST /photos', function(done) {
//         Post.findOneAndRemove(post, function() {
//             //how many tours are there now?
//             Post.find(function(err, posts) {
//                 var postCount = posts.length
//                 chai.request('localhost:3000')
//                 .post('/posts', post)
//                 .end(function (err, res) {
//                     //check database for one more tour
//                     Post.find(function(err, posts) {
//                         postCount.should.be.equal(posts.length)
//
//                         //check response is successful
//                         res.should.have.status(200)
//                         done()
//                     })
//                 })
//             })
//         })
//     })
// })

// it('Some test', function() {
//     //
// })
//
//
//
// it('Some test', () => {
//     //
// })
//
//
// it('Should return an array of posts', (done) => {
//   Post.find({}).then((posts) => {     // Searches for all Posts
//     expect(posts).to.be.an('array');  // Expects posts to be an array
//     done();
//     return Post.findById(posts[0]._id)                       // Calls done on a success
// }).then(() => {
//
// }).catch((err) => {
//     done(err);                        // Or call done with an error.
//   });
// });
