#include <Arduino.h>
#include <Wire.h>
#include <esp_now.h>
#include <WiFi.h>
#include <SPI.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_I2CDevice.h>
#include <Bounce2.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#define NextButton 10
#define OkButton 9
#define I2C_DEV_ADDR 0x55

#define WIFI_STA_NAME "KarnPrAe 2.4G"
#define WIFI_STA_PASS "03042103"

// #define TARGET_BOARD "esp32/4b3g56" // target_for_First_board
#define TARGET_BOARD "esp32/4b3g55" // target_for_Second_board

WiFiClient client;

LiquidCrystal_I2C lcd(0x27, 16, 2);
Bounce debouncer_next = Bounce();
Bounce debouncer_ok = Bounce();
char default_msg[5][17];
char custom_msg[17];
int idx = 1;
int numMsg = 0;
uint32_t isUpdate = 0;
uint32_t currentState = 0;
HTTPClient http;

class API
{
private:
    String _url;
    HTTPClient _http;

public:
    API(String baseURL)
    {
        this->_url = baseURL;
    };

    void CreateMessage(
        char *msg,
        char *createdBy,
        char *sendTo)
    {
        char payload[200];
        snprintf(payload, sizeof(payload), "{\"msg\":\"%s\",\"createdBy\":\"%s\",\"sendTo\":\"%s\"}", msg, createdBy, sendTo);
        this->_http.begin(this->_url + "/msg");
        this->_http.addHeader("Content-Type", "application/json");
        int httpResponseCode = http.POST(String(payload));
        if (httpResponseCode >= 200 && httpResponseCode < 300)
        {
            Serial.printf("Create Msg %s,%s To %s sucess\n", createdBy, msg, sendTo);
        }
        else
        {
            Serial.printf("error:%d\n", httpResponseCode);
        }
        this->_http.end();
    };
    /**
      String msg["id"] for message id
      String msg["msg"] for message
      */
    void GetMenus(String boardId, JsonDocument doc)
    {
        this->_http.begin(this->_url + "/msg/" + boardId);
        int httpResponseCode = this->_http.GET();
        if (httpResponseCode >= 200 || httpResponseCode < 300)
        {

            Serial.println("Get Msg sucess");
            String payload = this->_http.getString();
            this->_http.end();
            DeserializationError error = deserializeJson(doc, payload.c_str());
            if (error)
            {
                Serial.print(F("deserializeJson() failed: "));
                Serial.println(error.f_str());
            }
        }
        this->_http.end();
    }
};

API api_client("http://192.168.1.43:3000");

void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len)
{
    memcpy(&custom_msg, incomingData, sizeof(custom_msg));
    Serial.print("Bytes received: ");
    Serial.println(len);
    Serial.print("Char: ");
    Serial.println(custom_msg);
    currentState = 3;
    isUpdate = 0;
}

void setup()
{
    lcd.init();
    lcd.backlight();
    debouncer_next.attach(NextButton, INPUT_PULLUP);
    debouncer_next.interval(15);
    debouncer_ok.attach(OkButton, INPUT_PULLUP);
    debouncer_ok.interval(15);
    strcpy(default_msg[0], "I Love You");
    numMsg++;
    strcpy(default_msg[1], "I Miss You");
    numMsg++;
    strcpy(default_msg[2], "I Need You");
    numMsg++;
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_STA_NAME, WIFI_STA_PASS);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
        digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    }
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
    if (esp_now_init() != ESP_OK)
    {
        Serial.println("Error initializing ESP-NOW");
        return;
    }
    else
    {
        Serial.println("ESP-NOW Initialized");
    }
    esp_now_register_recv_cb(OnDataRecv);
    // Turn on the blacklight and print a message.
    // lcd.setCursor(0, 0);
    // lcd.print(">SELECT MESSAGE<");
    // lcd.setCursor(12, 1);
    // lcd.print("Next");
}
void loop()
{
    debouncer_next.update();
    debouncer_ok.update();
    // Serial.println(currentState);
    // State 0 : Select Message Status
    if (currentState == 0)
    {
        if (!isUpdate)
        {
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print(">SELECT MESSAGE<");
            lcd.setCursor(14, 1);
            lcd.print("Ok");
            isUpdate = 1;
        }
        if (debouncer_ok.fell())
        {
            currentState = 1;
            isUpdate = 0;
            // delay(6000);
        }
    }
    // State 1 : Default Message
    else if (currentState == 1)
    {
        if (!isUpdate)
        {
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print(default_msg[0]);
            lcd.setCursor(9, 1);
            lcd.print("Next|Ok");
            isUpdate = 1;
            // delay(1000);
        }
        if (debouncer_next.fell())
        {
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print(default_msg[(idx++) % numMsg]);
            lcd.setCursor(9, 1);
            lcd.print("Next|Ok");
        }
        if (debouncer_ok.fell())
        {
            currentState = 2;
            isUpdate = 0;
            // delay(000);
        }
    }
    // State 2 : Sending Status
    else if (currentState == 2)
    {

        lcd.clear();
        lcd.setCursor(0, 0);

        lcd.print("Sending...");
        if (WiFi.status() == WL_CONNECTED)
        {
            Serial.println("WiFi Connected");
            api_client.CreateMessage(default_msg[(idx - 1) % numMsg], "?", TARGET_BOARD);
        }
        else
        {
            Serial.println("WiFi Disconnected");
        }
        delay(2000);
        lcd.clear();
        currentState = 0;
    }

    else if (currentState == 3)
    {
        if (!isUpdate)
        {
            Serial.println("Custom Message");
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print(custom_msg);
            lcd.setCursor(14, 1);
            lcd.print("Ok");
            isUpdate = 1;
        }
        if (debouncer_ok.fell())
        {
            currentState = 0;
            isUpdate = 0;
            // delay(000);
        }
    }
}