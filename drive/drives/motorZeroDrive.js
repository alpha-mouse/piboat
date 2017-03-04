const rpio = require('rpio');

let leftPins = null;
let rightPins = null;

module.exports = {
    type: 'motorZero',
    init,
    speed,
    stop,
};

/**
 * Initialize raspberry pi gpio pins to run motors via motorzero
 * @param {number} leftMotor - motorzero output port powering left motor
 * @param {number} rightMotor - motorzero output port powering right motor
 */
function init(leftMotor = 1, rightMotor = 2) {
    rpio.init({mapping: 'gpio'});
    leftPins = createAndInitMotorPins(leftMotor);
    rightPins = createAndInitMotorPins(rightMotor);
}

function speed(left = 1, right = 1) {
    rpio.write(leftPins.positive, rpio.HIGH);
    rpio.write(leftPins.enable, rpio.HIGH);

    rpio.write(rightPins.positive, rpio.HIGH);
    rpio.write(rightPins.enable, rpio.HIGH);
}

function stop() {
    rpio.write(leftPins.enable, rpio.LOW);
    rpio.write(rightPins.enable, rpio.LOW);
}

function createAndInitMotorPins(motorNumber) {
    const pins = getMotorPins(motorNumber);
    rpio.open(pins.enable, rpio.OUTPUT, rpio.LOW);
    rpio.open(pins.positive, rpio.OUTPUT, rpio.LOW);
    rpio.open(pins.negative, rpio.OUTPUT, rpio.LOW);
    return pins;
}

function getMotorPins(motorNumber) {
    switch (motorNumber) {
        case 1:
            return {
                enable: 5,
                positive: 24,
                negative: 27,
            };
        case 2:
            return {
                enable: 17,
                positive: 6,
                negative: 22,
            };
        case 3:
            return {
                enable: 12,
                positive: 23,
                negative: 16,
            };
        case 4:
            return {
                enable: 25,
                positive: 13,
                negative: 18,
            };
        default:
            throw Error(`Motorzero motor number ${motorNumber} not recognized. Only 1, 2, 3, 4 are allowed.`);
    }
}