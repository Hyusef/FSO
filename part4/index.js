
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

/*
index js
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
}) */

/*
models/blogs
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) 

const Blog = mongoose.model('Blog', blogSchema)
*/

/* 
app.js
const mongoUrl = 'mongodb+srv://mystack:ninja@cluster0.i9n7b.mongodb.net/blogdatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)
app.use(cors())
app.use(express.json())
 */


/* 
blogposts.js
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(request.body)
    })
}) */





