'use strict';

module.exports.register = (server) => {
    var httpStatusCode = require('http-status');

    server.on('NotFound', (req, res) => {
        res.send(httpStatusCode.NOT_FOUND, new Error('Method not implemented', 'METHOD_NOT_IMPLEMENTED'));
    });

    server.on('VersionNotAllowed', (req, res) => {
        res.send(httpStatusCode.NOT_FOUND, new Error('Unsupported API version', 'INVALID_VERSION'));
    });

    server.on('InvalidVersion', (req, res) => {
        res.send(httpStatusCode.NOT_FOUND, new Error('Unsupported API version', 'INVALID_VERSION'));
    })

    server.on('MethodNotAllowed', (req, res) => {
        res.send(httpStatusCode.METHOD_NOT_ALLOWED, new Error('Method not implemented', 'METHOD_NOT_ALLOWED'));
    });

    server.on('restifyError', (req, res) => {
        res.send(httpStatusCode.INTERNAL_SERVER_ERROR, err);
    });
};