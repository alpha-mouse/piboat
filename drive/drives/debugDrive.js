module.exports = {
    type: 'debug',
    speed,
    stop,
};

function speed(left = 1, right = 1) {
    console.log(`== SPEED ${left.toFixed(2)} : ${right.toFixed(2)}`);
}

function stop() {
    console.log('== STOP');
}