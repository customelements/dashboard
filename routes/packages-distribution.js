var unirest = require('unirest');

module.exports = function (req, res) {
  var template = {"item": [
    {
      "value": 100,
      "label": "bower",
      "color": "13699c"
    },
    {
      "value": 160,
      "label": "npm",
      "color": "198acd"
    },
    {
      "value": 300,
      "label": "bower & npm",
      "color": "60b8ec"
    }
  ]};

  unirest
    .get('http://customelements-fetch.herokuapp.com/packages')
    .end(function (response) {
      console.log('Total:', Object.keys(response.body).length);

      for (var entry in response.body) {
        // do something
      }

      res.send(template);
    });
};