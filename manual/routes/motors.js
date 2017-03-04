const express = require('express');
const router = express.Router();

/* send commands to motors. */
module.exports = function (motorController) {

    router.post('/stop', function (req, res) {
        motorController
            .stop()
            .then(
                x => res.send(),
                onError(res));
    });

    router.post('/speed', function (req, res) {
        motorController
            .speed(req.body)
            .then(
                x => res.send(),
                onError(res));
    });

    return router;


    function onError(res) {
        return function(err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).send();
        };
    }
};
