var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
 
var app = express()
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
 
app.use(function (req, res, next) {
  var views = req.session.views
//   sid = req.sessionID;
//   console.log(sid);
  if (!views) {
    views = req.session.views = {};
    console.log("views "+ views)
  }
 
  // get the url pathname 
  var pathname = parseurl(req).pathname
 
  // count the views 
  views[pathname] = (views[pathname] || 0) + 1
 
  next()
})
 
app.get('/foo', function (req, res, next) {
    sid = req.sessionID
    console.log(sid)
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})
 
app.get('/bar', function (req, res, next) {
    req.session.destroy()
    sid = req.sessionID
    console.log(sid)
    delete sid;
    console.log("bar")
    // console. log(sid)
  res.send('you viewed this page ' + "req.session.views['/bar']" + ' times')
})

app.listen(2000,function(){
    console.log("server is running");
});