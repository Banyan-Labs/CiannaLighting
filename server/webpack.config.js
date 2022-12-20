const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server.ts',
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    externals: [nodeExternals()]
}
