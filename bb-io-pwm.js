var b = require('bonescript');

var pwm0 = "P8_13";
var pwm1 = "P8_19";
var value = 0.0;

b.pinMode(pwm0, b.OUTPUT);
b.pinMode(pwm1, b.OUTPUT);

loop();

function loop() {
  b.analogWrite(pwm0, value);
  b.analogWrite(pwm1, 1 - value);
  
  value += 0.10;
	if (value > 1) value = 0.0;
	
  setTimeout(loop, 500);
}