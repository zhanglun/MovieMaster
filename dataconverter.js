var fs = require('fs');
var path = require('path');
var xlsx = require("node-xlsx");

var fileRoot = './moviedata/';

fs.readdir(fileRoot, function (err, dir) {
  var result = [];
  dir.map(function (filepath) {
    var list = xlsx.parse(fileRoot + filepath);
    var keys = list[0].data[0];
    var data = list[0].data.slice(1);
    

    result = result.concat(data.map(function (item) {
      var obj = {};
      item.map(function (val, i) {
        obj[keys[i]] = val;
      });
      return obj;
    }));
  });
  fs.appendFile('data.json', JSON.stringify(result) ,function(err, file){
      console.log('...append!');
    });
});