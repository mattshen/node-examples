const express = require('express');

/** 
 * Show cases for different types of middleware: 
 * 1. Application-level
 * 2. Router-level middleware
 * 3. Error-handling middleware
 * 4. Built-in middleware
 * 5. Third-party middleware
 */

// custom middleware create
const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
  next();
}

const app = express()

// app-level
app.use(LoggerMiddleware);

// app-level
app.get('/users', (req, res) => {
  res.json([{
    name: "John Smith"
  }, {
    name: "Matt Smith"
  }])
})

// save route
app.post('/save', (req, res) => {
  res.json({
    'status': true
  })
})

// router level
const posts = express.Router();
posts.use('/:id', function(req, res, next){
  console.log(`Request URL: ${req.originalUrl}`);
});

app.use('/posts', posts);

app.listen(3002, (req, res) => {
  console.log('server running on port 3002')
});


