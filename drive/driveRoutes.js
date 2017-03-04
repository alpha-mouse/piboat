const express = require('express');
const router = express.Router();

module.exports = function (drive) {

    router.get('/type', function (req, res) {
        res.send(drive.type);
    });

    router.post('/speed', function (req, res) {
        const left = Number.isFinite(req.body.left) ? req.body.left : 1;
        const right = Number.isFinite(req.body.right) ? req.body.right : 1;
        drive.speed(left, right);
        res.send({left, right});
    });

    router.post('/stop', function (req, res) {
        drive.stop();
        res.send();
    });

    return router;
};
