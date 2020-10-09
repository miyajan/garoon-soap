const path = require('path');

const doMinimize = process.argv.indexOf('--optimize-minimize') !== -1;
const outputFilename = doMinimize ? 'garoon-soap.min.js' : 'garoon-soap.js';

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: outputFilename,
        path: path.resolve(__dirname, 'build'),
        library: 'GaroonSoap'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    }
};
