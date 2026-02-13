module.exports = {
  devServer: {
    // Fix: replace deprecated onBeforeSetupMiddleware / onAfterSetupMiddleware
    // with the modern setupMiddlewares option expected by webpack-dev-server 4.x
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares
    },
  },
}
