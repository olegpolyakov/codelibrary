import path from 'path';
import sass from 'sass';
import dotenv from 'dotenv';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import CssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

dotenv.config();

export default env => {
    return {
        entry: {
            'app': './client/index.js'
        },

        output: {
            path: path.resolve('public'),
            filename: 'js/[name].js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    resolve: {
                        fullySpecified: false
                    },
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', {
                                    'runtime': 'automatic'
                                }]
                            ]
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
                                postcssOptions: {
                                    plugins: [autoprefixer]
                                }
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
            static: {
                directory: path.resolve('public')
            },
            port: 3000,
            historyApiFallback: true
        },

        devtool: (env === 'development') ? 'eval-source-map' : undefined,

        plugins: [
            new webpack.DefinePlugin({
                'APP_ENV': JSON.stringify(env)
            }),
            new CssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve('client', 'index.html'),
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
                '@': path.resolve('client')
            }
        }
    };
};