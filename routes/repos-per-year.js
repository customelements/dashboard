var unirest = require('unirest');
var moment = require('moment');

module.exports = function (req, res) {
  var template = {
    "x_axis": { "type": "datetime", "labels": ["2011", "2012", "2013", "2014", "2015"]},
    "series": [{"data": []}]
  };

  unirest
    .get('http://customelements-fetch.herokuapp.com/repos')
    .end(function (response) {
      var eleven = 0, twelve = 0, thirteen = 0, fourteen = 0, fifteen = 0, total = 0;

      console.log('Total:', Object.keys(response.body).length);

      for (var entry in response.body) {
        var momentCreated = moment(response.body[entry].github.created_at);

        if (momentCreated.isAfter('2015-01-01')) {
          fifteen++;
          console.log('2015:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2014-01-01')) {
          fourteen++;
          console.log('2014:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2013-01-01')) {
          thirteen++;
          console.log('2013:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2012-01-01')) {
          twelve++;
          console.log('2012:', response.body[entry].github.full_name);
        } else if (momentCreated.isAfter('2011-01-01')) {
          eleven++;
          console.log('2011:', response.body[entry].github.full_name);
        }
      }

      template.series[0].data = [eleven, twelve, thirteen, fourteen, fifteen];
      res.send(template);
    });
};