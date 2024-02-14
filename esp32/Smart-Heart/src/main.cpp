#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_I2CDevice.h>
#include <Bounce2.h>
#define NextButton 10
#define OkButton 9
#define I2C_DEV_ADDR 0x55

LiquidCrystal_I2C lcd(0x27, 16, 2);
Bounce debouncer_next = Bounce();
Bounce debouncer_ok = Bounce();
char default_msg[5][17];
char custom_msg[17];
int idx = 1;
int numMsg = 0;
uint32_t isUpdate = 0;
uint32_t currentState = 0;

// void receiveEvent(int len) {
//   while (Wire.available()) {
//     Serial.println("Receiving");
//     strcpy(custom_msg, (char*)Wire.read());
//     currentState = 3;
//   }
// }

void setup()
{
  // lcd.init();
  // lcd.backlight();
  Wire.begin();
  Serial.begin(115200);
  debouncer_next.attach(NextButton, INPUT_PULLUP);
  debouncer_next.interval(15);
  debouncer_ok.attach(OkButton, INPUT_PULLUP);
  debouncer_ok.interval(15);
  // initialize the LCD
  strcpy(default_msg[0], "I Love You");
  numMsg++;
  strcpy(default_msg[1], "I Miss You");
  numMsg++;
  strcpy(default_msg[2], "I Need You");
  numMsg++;

  // Turn on the blacklight and print a message.
  // lcd.setCursor(0, 0); 
  // lcd.print(">SELECT MESSAGE<");
  // lcd.setCursor(12, 1);
  // lcd.print("Next");
}
void loop() {
  debouncer_next.update();
  debouncer_ok.update();
  uint8_t byteReceived = Wire.requestFrom(I2C_DEV_ADDR, 4);
  Serial.printf("Byte Received: %u\n", byteReceived);
  if((bool)byteReceived) {
    uint8_t temp[byteReceived];
    Wire.readBytes(temp, byteReceived);
    Serial.printf("Received: %s\n", temp);
  }
  // if ( debouncer_next.fell() ) { 
  //   // Serial.println("Next");
  //   lcd.clear();
  //   lcd.setCursor(0, 0);
  //   lcd.print(default_msg[(idx++)%numMsg]);
  //   lcd.setCursor(9, 1);
  //   lcd.print("Next|Ok");     
  // }
  // if (debouncer_ok.fell()) {
  //   //Serial.println("Ok");
  //   lcd.clear();
  //   lcd.setCursor(0, 0);
  //   lcd.print("Sending...");
  //   delay(10000);
  //   lcd.clear();
  // }
//Serial.println(currentState);
//State 0 : Select Message Status
if (currentState == 0) {
  if (!isUpdate) {
    lcd.clear();
    lcd.setCursor(0, 0); 
    lcd.print(">SELECT MESSAGE<");
    lcd.setCursor(14, 1);
    lcd.print("Ok");
    isUpdate = 1;
  }
  if (debouncer_ok.fell()){
    currentState = 1;
    isUpdate = 0;
    //delay(6000);
  }
}
  //State 1 : Default Message
else if (currentState == 1) {
  if (!isUpdate) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(default_msg[0]);
    lcd.setCursor(9, 1);
    lcd.print("Next|Ok");
    isUpdate = 1;
    //delay(1000);
  }
  if ( debouncer_next.fell() ) { 
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(default_msg[(idx++)%numMsg]);
    lcd.setCursor(9, 1);
    lcd.print("Next|Ok");     
  }
  if (debouncer_ok.fell()) {
      currentState = 2;
      isUpdate = 0;
      //delay(000);
    }
  }
  //State 2 : Sending Status
else if (currentState == 2) {
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Sending...");
    delay(2000);
    lcd.clear();
    currentState = 0;
  }
  
  else if (currentState == 3) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(custom_msg);
    lcd.setCursor(14, 1);
    lcd.print("Ok");
    lcd.clear();
    currentState = 0;
  }

}