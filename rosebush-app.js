var app = require('express').createServer();

app.get('/', function(req,res){
   res.render('index.html.haml', {
       layout: true,
       locals: {
           title: 'ROSEBUSH HOME'
       }
   });
});


app.get('/hello', function(req, res){
    res.send('hello Shree');
});

app.get('/*.css', function(req,res){
  res.render('style.css.sass', { layout: false });
});


app.get('/hello/shree', function(req,res){
  res.render('hello_shree.html.haml', {
    layout: true,
    locals: {
      title: 'ROSEBUSH Home'
    }
  });
});
app.listen(21000);

