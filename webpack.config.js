// require('webpack')
// require('weex-loader')

// var path = require('path')

// module.exports = {
//   entry: {
//     main: path.join(__dirname, 'src', 'main.we?entry=true')
//   },
//   output: {
//     path: 'dist',
//     filename: '[name].js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.we(\?[^?]+)?$/,
//         loaders: ['weex-loader']
//       }
//     ]
//   }
// }




require('webpack')
require('weex-loader')

var path = require('path')
var fs = require('fs');

var entry = {};

function walk(dir, root) {
  var directory = path.join(__dirname, root, dir);
  fs.readdirSync(directory)
    .forEach(function(file) {
      var fullpath = path.join(directory, file);
      var stat = fs.statSync(fullpath);
      var extname = path.extname(fullpath);
      if (stat.isFile() &&
             (extname === '.we')) {
        var name = path.join(root, 'build', dir, path.basename(file, extname));
        entry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() &&
                  file !== 'build') {
        var subdir = path.join(dir, file);
        walk(subdir, root);
      }
    });
}
walk('./', 'src');
module.exports = {
  entry: entry,
  output: {
    path: '.',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loaders: ['weex-loader']
      }
    ]
  }
}

