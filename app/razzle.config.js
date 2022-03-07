const path = require("path")

module.exports = {
  plugins: ["manifest"],
  modifyWebpackConfig({ webpackConfig }) {
    // LMAO
    if (webpackConfig.devServer && process.env.SITE_DOMAIN) {
      webpackConfig.devServer.host = process.env.SITE_DOMAIN;
      webpackConfig.devServer.publicPath = "https://" + process.env.SITE_DOMAIN + ":3001/";
      webpackConfig.output.publicPath = "https://" + process.env.SITE_DOMAIN + ":3001/";
    }
    webpackConfig.module.rules.push({
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
      options: {
        configFile: path.join(__dirname, "tsconfig.json")
      }
    })
    webpackConfig.resolve.extensions = [".tsx", ".ts", ".js"]
    return webpackConfig;
  }
};
