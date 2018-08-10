const path = require("path")
const glob = require("glob")
const purifyCSS = require("purifycss-webpack")
const webpack = require("webpack")
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractText = require('extract-text-webpack-plugin')
const website = {
    publicPath:'http://localhost:3000/'
}
module.exports = {
    devtool:'source-map',
    entry:"./src/entry.js",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        publicPath:website.publicPath
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:3000
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractText.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                importLoader:1
                            }
                        },
                       {loader:"postcss-loader"}
                    ],
                    
                   
                })
            },{
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',    
                        options:{
                            limit:50000,
                            outputPath:'img/'
                        }
                    }
                ]
            },{
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            },{
                test:/\.less$/,
                use:extractText.extract({
                    use:[
                        {loader:'css-loader'},
                        {loader:'less-loader'}
                    ],
                    fallback:'style-loader'
                })
            },{
                test:/\.sass$/,
                use:extractText.extract({
                    use:[
                        {loader:'css-loader'},
                        {loader:'sass-loader'}
                    ],
                    fallback:'style-loader'
                })
                
            },{
                test:/\.js$/,
                use:{loader:'babel-loader'},
                exclude:/node_modules/
            }
            
        ]
    },
    plugins:[
        // new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractText("css/main.css"),
        new purifyCSS({
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        })
    ]
       
    
}