const path = require('path');
const webpack = require('webpack');
//const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports={
    name:'tictaktoe-dev',
    mode:'development',//실서비스에선 production으로 바꿔줘야함
    devtool:'eval',
    resolve:{
        extensions:['.js','.jsx']
    },
    entry:{
        app:['./client'],
    },//입력
    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['>5% in KR','last 2 chrome versions'],
                        },
                        debug:true,
                    }],
                    '@babel/preset-react'
                ],
                //'@babel/plugin-proposal-class-properties'
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                ],
            },
        }],
    },
    plugins:[
        //new RefreshWebpackPlugin()
        //new webpack.LoaderOptionsPlugin({debug:true}),
    ],
    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.js',
        publicPath:'/dist/',
    }//출력 js 파일
    
}