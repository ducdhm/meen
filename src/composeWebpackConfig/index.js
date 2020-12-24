const { resolvePath } = require('@meenjs/utils');
const path = require('path');
const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const argv = require('yargs').argv;
const PROD = !!argv.prod;

module.exports = (name, entry, options) => merge({
    mode: PROD ? 'production' : 'development',
    devtool: PROD ? 'source-map' : 'inline-source-map',

    entry,
    output: {
        path: resolvePath('public'),
        filename: `${name}/scripts/[name].js`,
    },

    optimization: {
        minimizer: [
            new TerserJSPlugin({
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                    },
                },
            }),
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${name}/styles/[name].css`,
        }),
    ],
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                },
            },
            {
                test: require.resolve('moment'),
                loader: 'expose-loader',
                options: {
                    exposes: ['moment'],
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-syntax-dynamic-import',
                            ],
                        },
                    },
                    {
                        loader: 'string-replace-loader',
                        options: {
                            multiple: [
                                {
                                    search: '\'\\n\\s+\'',
                                    replace: '',
                                    flags: 'g',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/public/',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: `${name}/fonts/`,
                        },
                    },
                ],
            },
            {
                test: /^((?!.*logo|icon).*)\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: `${name}/fonts/`,
                        },
                    },
                ],
            },
            {
                test: /(\.png|\.jpg|\.gif|\.ico|(icon|logo)+(.*)\.svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: `${name}/img/`,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve(resolvePath('node_modules')),
        ],
        extensions: ['.json', '.js'],
    },
}, options || {});
