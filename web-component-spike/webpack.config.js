module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "react-web-component-style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}
