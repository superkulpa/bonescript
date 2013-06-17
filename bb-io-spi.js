var b = require('bonescript');
var exec = require('child_process').exec;

/* Запись и чтение в микру SPI.

*/

/** канал spi*/
var spi_channel = "/dev/spidev2.0"

/**выхода chip select */
var DAC0_select = "P8_21";
var DAC1_select = "P8_22";
var DAC2_select = "P8_23";
var DAC3_select = "P8_24";
var DAC4_select = "P8_25";
var DAC5_select = "P8_26";
var ENC0_select = "P8_3";
var ENC1_select = "P8_4";
var ENC2_select = "P8_5";
var ENC3_select = "P8_6";

/** Записать и прочитать с канала
 *  _chip_select - адрес микры на шине i2c
 *  _value - значение, число либо пробел-разделяемый список байт: 0xFF 0xFE
 *  _callback - обработка выполнения
 *  example: 
 *      set_spi(chip1_select, 0xFF, callback);
 * */
function set_spi(_chip_select, _value, _callback){
  //выставить бит chip_select
  b.digitalWrite(_chip_select, b.HIGH);
  //записать и считать
  exec("spitool -O -H -D " + spi_channel + " " + _value, _callback);
  //снять бит chip_select
  b.digitalWrite(_chip_select, b.LOW);  
}

//ногу на вывод
b.pinMode(ENC0_select, b.OUTPUT);

var i = 0xFF;
loop();

function loop() {
  
  //записать - считать
  set_spi(ENC0_select, i
          , function callback(error, get_value, stderr){
              if ( error !== null ) {
                console.log("err: " + stderr);
                //process.exit(1);
                return ;
              }
              console.log("set: " + i.toString(16) + ", get: " +  get_value);
          });  
  
//  
//    set_spi(DAC1_select, i
//          , function callback(error, get_value, stderr){
//              if ( error !== null ) {
//                console.log("err: " + stderr);
//                //process.exit(1);
//                return ;
//              }
//              console.log("set: " + i.toString(16) + ", get: " +  get_value);
//          });  

  if(i == 0xFF) i = 0xFE;else i = 0xFF;
  
  setTimeout(loop, 5000);
}
