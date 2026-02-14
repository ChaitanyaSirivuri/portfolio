module.exports = {
    // Fix 1: replace deprecated onBeforeSetupMiddleware / onAfterSetupMiddleware.
    // react-scripts hardcodes these in webpackDevServer.config.js.
    // Using a function form gives us the full devServerConfig so we can delete
    // those deprecated keys and replace them with the modern setupMiddlewares.
    devServer: (devServerConfig) => {
        const { onBeforeSetupMiddleware, onAfterSetupMiddleware, ...rest } =
            devServerConfig
        return {
            ...rest,
            setupMiddlewares: (middlewares, devServer) => {
                // Preserve react-scripts before-setup (evalSourceMapMiddleware, proxySetup)
                if (onBeforeSetupMiddleware) onBeforeSetupMiddleware(devServer)
                // Preserve react-scripts after-setup (redirectServedPath, noopServiceWorker)
                if (onAfterSetupMiddleware) onAfterSetupMiddleware(devServer)
                return middlewares
            },
        }
    },

    webpack: {
        configure: (webpackConfig) => {
            // Fix 2: switch sass-loader from the legacy JS API to the modern API.
            // Dart Sass 1.x emits a "legacy-js-api" deprecation for the old API.
            // quietDeps: true suppresses @import / '/' division warnings coming from
            // third-party node_modules (e.g. loaders.css) that we cannot modify.
            const findSassLoader = (rules) => {
                for (const rule of rules) {
                    if (rule.use) {
                        rule.use.forEach((loader) => {
                            if (
                                loader.loader &&
                                loader.loader.includes('sass-loader') &&
                                loader.options
                            ) {
                                loader.options.sassOptions = {
                                    ...(loader.options.sassOptions || {}),
                                    silenceDeprecations: ['legacy-js-api'],
                                    quietDeps: true,
                                }
                            }
                        })
                    }
                    if (rule.oneOf) findSassLoader(rule.oneOf)
                    if (rule.rules) findSassLoader(rule.rules)
                }
            }
            findSassLoader(webpackConfig.module.rules)
            return webpackConfig
        },
    },
}
