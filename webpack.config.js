const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  // devtool: "inline-source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style-prefixed.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {          
          filename: "assets/images/[name][ext]",
        }
      },
      {
        test: /\/images\/backgrounds\/.*\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {          
          filename: "assets/images/backgrounds/[name][ext]",
        }
      },
      {
        test: /\/images\/icons\/.*\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {          
          filename: "assets/images/icons/[name][ext]",
        }
      },
      {
        test: /\/images\/logos\/.*\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {          
          filename: "assets/images/logos/[name][ext]",
        }
      },
      {
        test: /\/fonts\/.*\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/fonts/[name][ext]",
        }
      },
    ]
  }
};