var express = require('express');

var app = express();

app.get('/packages-distribution', require('./routes/packages-distribution'));
app.get('/repos-per-year', require('./routes/repos-per-year'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Running on port:', app.get('port'));
});