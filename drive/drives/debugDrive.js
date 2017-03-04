module.exports = {
    type: 'debug',
    forward,
    stop,
};

function forward(left = 1, right = 1) {
    console.log(`== FORWARD ${left.toFixed(2)} : ${right.toFixed(2)}`);
}

function stop() {
    console.log('== STOP');
}