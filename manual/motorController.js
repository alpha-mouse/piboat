const Client = require('node-rest-client').Client;

let client = null;
let baseUrl = null;

// dammit. how do people call http sevices with this node. I can but guess.
// what I've got here is insane

module.exports = function (motorServiceBaseUrl) {
    client = new Client();
    baseUrl = motorServiceBaseUrl;
    return {
        speed,
        stop,
    };
};

function speed(speeds) {
    return post('/speed', speeds);
}

function stop() {
    return post('/stop');
}

function post(url, data) {
    return new Promise(function (resolve, reject) {
        client
            .post(
                baseUrl + url,
                {
                    data,
                    headers: {'Content-Type': 'application/json'}
                },
                function (data, response) {
                    if (response.statusCode && response.statusCode < 300) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
            .on('error', err => reject(err));
    });
}
