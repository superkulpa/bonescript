var b = require('bonescript');

var adc0 = "P9_39";
var adc1 = "P9_40";
var adc2 = "P9_37";
var adc3 = "P9_38";
//adc4 
var adc5 = "P9_36";
var adc6 = "P9_35";
//outputPin = "P8_13";

loop();

function loop() {
    
    console.log(" ADC0: " +  b.analogRead(adc0).toFixed(3)
            + " ADC1: " +  b.analogRead(adc1).toFixed(3)
            + " ADC2: " +  b.analogRead(adc2).toFixed(3)
            + " ADC3: " +  b.analogRead(adc3).toFixed(3)
            + " ADC5: " +  b.analogRead(adc5).toFixed(3)
            + " ADC6: " +  b.analogRead(adc6).toFixed(3) );
    //b.analogWrite(outputPin, value);
    setTimeout(loop, 1000);
}