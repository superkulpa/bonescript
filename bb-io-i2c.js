var b = require('bonescript');
var exec = require('child_process').exec;

/* Запись и чтение в микру I2C.
 Все операции делаются побайтно.
*/

///канал i2c, 2=i2c2
var i2c_channel = 2; //если считать с 0



/** Прочитать с канала
 *  _i2c_adress - адрес микры на шине i2c
 *  _offs - смещение байта данных внутри микры
 *  _callback - обработка выполнения
 * */
function get_i2c(_i2c_adress, _offs, _callback){
  var correct_i2c_channel = i2c_channel + 1;
  exec("i2cget -y " + (i2c_channel + 1) + " " + _i2c_adress + " " + _offs + " b", _callback);
}

/** Записать с канала
 *  _i2c_adress - адрес микры на шине i2c
 *  _offs - смещение байта данных внутри микры
 *  _value - значение
 *  _callback - обработка выполнения
 * */
function set_i2c(_i2c_adress, _offs, _value, _callback){
  var correct_i2c_channel = i2c_channel + 1;
  exec("i2cset -y " + correct_i2c_channel + " " + _i2c_adress + " " + _offs + " " + _value + " b", _callback);
}

var i = 0;
loop();

function loop() {
  
  get_i2c(0x20, 0x00
        , function callback(error, ret, stderr){
            if ( error !== null ) {
              console.log("err: " + stderr);
              //process.exit(1);
              return null;
            } 
            console.log("get: " + ret.toString(16)  );
          });


  set_i2c(0x027, 0x02, i
          , function callback(error, stdout, stderr){
              if ( error !== null ) {
                console.log("err: " + stderr);
                //process.exit(1);
                return ;
              }
              console.log("set: " + i.toString(16) );
          });  
  

  if(++i > 0xFF) i = 0;
  
  setTimeout(loop, 1000);
}
