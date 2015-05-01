var unirest = require('unirest');

module.exports = function (req, res) {
  var template = {"item": []};

  unirest
    .get('http://customelements-fetch.herokuapp.com/packages')
    .end(function (response) {
      var bower = 0, npm = 0, bower_npm = 0;

      console.log('Total:', Object.keys(response.body).length);

      for (var entry in response.body) {
        if (response.body[entry].bower && response.body[entry].npm) {
          bower_npm++;
        } else if (response.body[entry].bower) {
          bower++;
        } else if (response.body[entry].npm) {
          npm++;
        }
      }

      template.item.push({
        'label': 'bower',
        'value': bower
      });

      template.item.push({
        'label': 'npm',
        'value': npm
      });

      template.item.push({
        'label': 'bower & npm',
        'value': bower_npm
      });

      res.send(template);
    });
};