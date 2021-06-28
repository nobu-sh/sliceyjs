const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
const config = require('./config')

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new CopyPlugin({
    patterns: [
      {
        from: 'public',
        to: '',
      }
    ]
  })
]

if (process.env.NODE_ENV === 'production') { 
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.map$/, /_redirects/],
    }),
    // new PrerenderSPAPlugin({
    //   staticDir: path.join(process.cwd(), 'dist'),
    //   routes: ['/'],
    // })
  )
}

module.exports = () => ({
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|webp|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'css': path.join(__dirname, 'src/css'),
      'sass': path.join(__dirname, 'src/sass'),
      'scss': path.join(__dirname, 'src/scss'),
      'views': path.join(__dirname, 'src/views'),
      'assets': path.join(__dirname, 'src/assets'),
      '~mixins': path.join(__dirname, 'src', 'scss', 'mixins')
    },
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
  },
  entry: {
    app: path.resolve(process.cwd(), 'src', 'index.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: process.env.NODE_ENV === 'production' ? "/sliceyjs" : "/"
  },
  mode: process.env.NODE_ENV,
  // devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
  devServer: {
    port: config.port,
    host: '0.0.0.0',
    historyApiFallback: true
  }
})
