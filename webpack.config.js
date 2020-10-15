const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'webpack-entry.css': [
            path.resolve(__dirname, 'assets/css/reset.css'),
            path.resolve(__dirname, 'assets/css/main.css')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.(svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'image/',
                            publicPath: 'image'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'css/font/',
                            publicPath: 'font'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '/css/min.css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /css\/min.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ],
            },
            canPrint: true
        }),
        new ConcatPlugin(
            {
                uglify: true,
                name: 'min',
                fileName: 'js/[name].js',
                filesToConcat: [
                    path.resolve(__dirname, 'assets/js/jquery-3.2.1.min.js'),
                    path.resolve(__dirname, 'assets/js/howler.min.js'),
                    path.resolve(__dirname, 'assets/js/screenfull.js'),
                    path.resolve(__dirname, 'assets/js/ios_fullscreen.js'),
                    path.resolve(__dirname, 'assets/js/platform.js'),
                    path.resolve(__dirname, 'assets/js/createjs-2015.11.26.min.js'),
                    path.resolve(__dirname, 'assets/js/ctl_utils.js'),
                    path.resolve(__dirname, 'assets/js/sprite_lib.js'),
                    path.resolve(__dirname, 'assets/js/game-default-configuration.js'),
                    path.resolve(__dirname, 'assets/js/settings.js'),
                    path.resolve(__dirname, 'assets/js/CGameSettings.js'),
                    path.resolve(__dirname, 'assets/js/CPreloader.js'),
                    path.resolve(__dirname, 'assets/js/CMain.js'),
                    path.resolve(__dirname, 'assets/js/CTextButton.js'),
                    path.resolve(__dirname, 'assets/js/CToggle.js'),
                    path.resolve(__dirname, 'assets/js/CGfxButton.js'),
                    path.resolve(__dirname, 'assets/js/CMenu.js'),
                    path.resolve(__dirname, 'assets/js/CGame.js'),
                    path.resolve(__dirname, 'assets/js/CInterface.js'),
                    path.resolve(__dirname, 'assets/js/CCreditsPanel.js'),
                    path.resolve(__dirname, 'assets/js/CBetPanel.js'),
                    path.resolve(__dirname, 'assets/js/CChipPanel.js'),
                    path.resolve(__dirname, 'assets/js/CSimpleBetPanel.js'),
                    path.resolve(__dirname, 'assets/js/CForecastPanel.js'),
                    path.resolve(__dirname, 'assets/js/CBetList.js'),
                    path.resolve(__dirname, 'assets/js/CFichesController.js'),
                    path.resolve(__dirname, 'assets/js/CButBet.js'),
                    path.resolve(__dirname, 'assets/js/CVector2.js'),
                    path.resolve(__dirname, 'assets/js/CMsgBox.js'),
                    path.resolve(__dirname, 'assets/js/CInstructionBox.js'),
                    path.resolve(__dirname, 'assets/js/CTrackBg.js'),
                    path.resolve(__dirname, 'assets/js/CHorse.js'),
                    path.resolve(__dirname, 'assets/js/CTweenController.js'),
                    path.resolve(__dirname, 'assets/js/CRankingGui.js'),
                    path.resolve(__dirname, 'assets/js/CArrivalPanel.js'),
                    path.resolve(__dirname, 'assets/js/CWinPanel.js'),
                    path.resolve(__dirname, 'assets/js/CButStartRace.js'),
                    path.resolve(__dirname, 'assets/js/CAreYouSurePanel.js'),
                    path.resolve(__dirname, 'assets/js/CGate.js'),
                    path.resolve(__dirname, 'assets/js/CCTLText.js'),
                    path.resolve(__dirname, 'assets/js/CFicheBut.js'),
                    path.resolve(__dirname, 'assets/js/game-configuration.js')
                ]
            }
        )
    ]
};
