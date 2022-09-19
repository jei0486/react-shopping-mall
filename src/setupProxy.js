const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    /* 다른 포트를 사용할경우 createProxyMiddleware 를 사용하여 cors 관련 오류를 방지함  */
    app.use(
        '/product',
        createProxyMiddleware({
            target: 'http://localhost:9000',
            changeOrigin: true,
        })
    );

    app.use(
        '/order',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    );

    // keycloak
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );


};