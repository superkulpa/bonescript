var b = require('bonescript');

var pwm0 = "P9_14";
var pwm1 = "P9_16";
var value = 0.0;

b.pinMode(pwm0, b.OUTPUT);
b.pinMode(pwm1, b.OUTPUT);

loop();

function loop() {
  b.analogWrite(pwm0, value);
  b.analogWrite(pwm1, 1 - value);
  
  console.log(" PWM0: " +  value.toFixed(3)
            + " PWM1: " +  (1-value).toFixed(3));

value += 0.10;
	if (value > 1) value = 0.0;

  setTimeout(loop, 1000);
}