
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            '/apis': {
                target: 'http://localhost:8085',
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    },
}
