OK. So I've written a cool motor controlling web service on node.js (lives in folder /drive).
And then I've found that MotorZero uses gpio pins that don't support hardware PWM and I cannot easily do software PWM on node.js as it is single-threaded.
So, here comes python motor controlling web service.

Requires `pip install bottle`