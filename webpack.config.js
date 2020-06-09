const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const dotenv = require('dotenv');
const autoprefixer = require('autoprefixer')();
const CssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

module.exports = env => {
    return {
        entry: {
            'app': './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'js/[name].js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        CssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer]
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        CssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass,
                                webpackImporter: false,
                                sassOptions: {
                                    includePaths: [
                                        path.resolve('node_modules')
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        },

        devServer: {
            contentBase: path.join(__dirname, './'),
            port: 3000,
            historyApiFallback: true
        },

        devtool: (env === 'development') ? 'eval-source-map' : undefined,

        plugins: [
            new webpack.DefinePlugin({
                'APP_ENV': JSON.stringify(env),
                'FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY)
            }),
            new CssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                inject: 'head',
                scriptLoading: 'defer',
                hash: true
            })
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },

        resolve: {
            extensions: ['.js', '.jsx', '.json'],

            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    };
};