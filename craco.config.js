module.exports = {
    devServer: {
        // Fix: replace deprecated onBeforeSetupMiddleware / onAfterSetupMiddleware
        // with the modern setupMiddlewares option expected by webpack-dev-server 4.x
        setupMiddlewares: (middlewares, devServer) => {
            return middlewares
        },
    },

    webpack: {
        configure: (webpackConfig) => {
            // Fix: switch sass-loader from the legacy JS API to the modern API
            // (required by Dart Sass 1.x; old api triggers "legacy-js-api" deprecation)
            // Also set quietDeps:true to silence @import/@use warnings from third-party
            // node_modules (e.g. loaders.css) that we cannot modify.
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
