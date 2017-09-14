const outputFilename = 'build/garoon-soap.js';

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
