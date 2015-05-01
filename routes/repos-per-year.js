var unirest = require('unirest');
var moment = require('moment');

module.exports = function (req, res) {
  var template = {
    "x_axis": { "type": "datetime", "labels": ["2012", "2013", "2014", "2015"]},
    "series": [{"data": []}]
  };

  unirest
    .get('http://customelements-fetch.herokuapp.com/repos')
    .end(function (response) {
      var twelve = 0, thirteen = 0, fourteen = 0, fifteen = 0;

      console.log('Total:', Object.keys(response.body).length);

      for (var entry in response.body) {
        var momentCreated = moment(response.body[entry].github.created_at);

        if (momentCreated.isAfter('2014-12-31')) {
          fifteen++;
          console.log('2015:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2013-12-31')) {
          fourteen++;
          console.log('2014:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2012-12-31')) {
          thirteen++;
          console.log('2013:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2011-12-31')) {
          twelve++;
          console.log('2012:', response.body[entry].github.full_name);
        }
      }

      template.series[0].data = [twelve, thirteen, fourteen, fifteen];
      res.send(template);
    });
};