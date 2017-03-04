from gpiozero import Motor, OutputDevice
from bottle import request, post, run

m1 = Motor(24, 27)
m1enable = OutputDevice(5)
m4 = Motor(13, 18)
m4enable = OutputDevice(25)

@post('/stop')
def stop():
    m1enable.off()
    m4enable.off()
    pass


@post('/speed')
def speed():
    left = request.json['left']
    right = request.json['right']
    m1.forward(0.4 + right / 2)
    m4.forward(0.4 + left / 2)
    m1enable.on()
    m4enable.on()

run(host='0.0.0.0', port=3001)
