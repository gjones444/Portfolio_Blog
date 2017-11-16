let express = require('express');
let bodyParser = require('body-parser');
let realm = require('realm');
let routes = require('./controller/routes.js');

let app = express();


let PostSchema = {
  name: 'BlogPost',
  properties: {
    timestamp: 'date',
    title: 'string',
    content: 'string'
  }
};

let blogRealm = new Realm({
  path: 'post.realm',
  schema: [PostSchema]
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/blog', function(req, res) {
  let posts = blogRealm.objects('BlogPost').sorted('timestamp', true);
  res.render('index.ejs', {posts: posts});
});

app.post('/blog_post', function(req, res) {
  title = req.body['title'],
  content = req.body['content'],
  timestamp = new Date();
  blogRealm.write(() => {
    blogRealm.create('BlogPost', {title: title, content: content, timestamp: timestamp});
  });
  res.sendFile(__dirname + "/write-complete.html");
});

app.use('/', routes);
app.use(express.static('./client'));
//you use this kind of route when pushing to heroku
let PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});
