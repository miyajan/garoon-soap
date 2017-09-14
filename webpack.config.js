const doMinimize = process.argv.indexOf('--optimize-minimize') !== -1;
const outputFilename = doMinimize ? 'build/garoon-soap.min.js' : 'build/garoon-soap.js';

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: outputFilename,
        library: 'GaroonSoap'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
};
