const autoprefixer = require('autoprefixer');
const path = require('path');

function tryResolve_(url, sourceFilename) {
    try {
        return require.resolve(url, {
            paths: [path.dirname(sourceFilename)]
        });
    } catch (e) {
        return '';
    }
}

function tryResolveScss(url, sourceFilename) {
    const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
    return tryResolve_(normalizedUrl, sourceFilename) ||
        tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
            sourceFilename);
}

function materialImporter(url, prev) {
    if (url.startsWith('@material')) {
        const resolved = tryResolveScss(url, prev);
        return {
            file: resolved || url
        };
    }
    return {
        file: url
    };
}
module.exports = {
    entry: ['./app.scss', './app.js'],
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
          },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                        },
          },
                    {
                        loader: 'sass-loader',
                         options: {
                        importer: function(url, prev) {
                            if(url.indexOf('@material') === 0) {
                                var filePath = url.split('@material')[1];
                                var nodeModulePath = './node_modules/@material/' + filePath;
                                return { file: require('path').resolve(nodeModulePath) };
                            }

                            if(url.indexOf('material-components-web') === 0) {
                                var nodeModulePath = './node_modules/material-components-web/material-components-web';
                                return { file: require('path').resolve(nodeModulePath) };
                            }

                            return { file: url };
                        }
                    }
          }],
      },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
      }],
        
    },
};
