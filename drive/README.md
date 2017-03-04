1. Attach MotorZero to the raspberry.
2. Connect left motor to output 4, right to 1. If other outputs are used, edit app.js to init MotorZero drive with other outputs.
3. Connect power source.
4. git clone this repo to raspberry and go to /drive folder within.
5. npm install.
6. export NODE_ENV=production.
7. npm start.

GETting localhost:3001/type should return 'motorZero'.
POSTing localhost:3001/forward with body {"left": 1, "right": 1} will run the motors full speed.
 "left" and "right" should be within [0, 1] interval.
POSTing localhost:3001/stop will stop both motors.

Tested with node 6.10.
