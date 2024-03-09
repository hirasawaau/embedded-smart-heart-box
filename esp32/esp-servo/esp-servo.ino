#include <Arduino.h>
#include <WiFi.h>
#include <esp_now.h>
#include <ESP32PWM.h>
#include <ESP32Servo.h>
#include <PubSubClient.h>

#define WIFI_STA_NAME "Redmi Note 12 Pro+ 5G"
#define WIFI_STA_PASS "shadowgate"

//#define WIFI_STA_NAME "IshiHotspot"
//#define WIFI_STA_PASS "1q2w3e4r"

#define MQTT_SERVER "192.168.99.172"
// #define MQTT_SERVER "192.168.95.172"
#define MQTT_PORT 1883
#define MQTT_USERNAME "jinn"
#define MQTT_PASSWORD "jinn"

// #define MQTT_NAME "ESP32_0" // first_board
// uint8_t peerAddress[] = {0x3C, 0x61, 0x05, 0x03, 0xB5, 0xEC}; // first board
// #define MQTT_SUBSCRIBE_TOPIC "esp32/4b3g55" // board1
#define MQTT_NAME "ESP32_1"//second_board
uint8_t peerAddress[] = {0x3C, 0x61, 0x05, 0x03, 0xCC, 0x8C}; // second board
#define MQTT_SUBSCRIBE_TOPIC "esp32/4b3g56" // board2

#define DARKNESS_THRESHOLD 1500 //first board // Define the threshold for darkness
#define LDR_PIN 34              // Define the pin where the LDR is connected
// #define DARKNESS_THRESHOLD 3000// second // Define the threshold for darkness

WiFiClient client;
PubSubClient mqtt(client);

Servo servo;
uint32_t i = 0;
int test = 0;
esp_now_peer_info_t peerInfo;

char exampleRecieveMSG[16] = "test";
int sendedMsg = 0;

void callback(char *topic, byte *payload, unsigned int length)
{
    payload[length] = '\0';
    String topic_str = topic, payload_str = (char *)payload;
    Serial.println("[" + topic_str + "]: " + payload_str);

    /*
    your code to send to display board
    */
    esp_err_t result = esp_now_send(peerAddress, (uint8_t *)(char *)payload, strlen(payload_str.c_str()));
    if (result == ESP_OK)
    {
        Serial.println("Sent with success");
    }
    else
    {
        Serial.println("Error sending the data");
    }
    Serial.print("accept");
    Serial.println();
    Serial.println(analogRead(LDR_PIN));
    while (analogRead(LDR_PIN) > DARKNESS_THRESHOLD)
    {
        Serial.println("Darkness detected");
        Serial.println(analogRead(LDR_PIN));
        servo.write(90); // Set the servo position to 90 degrees
        delay(500);      // Wait for 300 milliseconds
        servo.write(0);  // Set the servo position to 0 degrees
        delay(500);
        servo.write(45);
    }
}

void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status)
{
    Serial.print("\r\nLast Packet Send Status:\t");
    Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
    Serial.println(status);
}

void setup()
{
    delay(1000);
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_STA_NAME);

    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_STA_NAME, WIFI_STA_PASS);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
        digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    }

    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");

    mqtt.setServer(MQTT_SERVER, MQTT_PORT);
    mqtt.setCallback(callback);
    Serial.begin(115200);
    Serial.setDebugOutput(true);
    servo.attach(23);        // Attach the servo to GPIO13
    servo.write(45);
    pinMode(LDR_PIN, INPUT); // Set the LDR pin as input

    if (esp_now_init() != ESP_OK)
    {
        Serial.println("Error initializing ESP-NOW");
        return;
    }

    esp_now_register_send_cb(OnDataSent);
    Serial.println(WiFi.macAddress());
    // if(int32_t n = WiFi.scanNetworks())
    // {
    //   for(uint8_t i = 0; i < n; i++)
    //   {
    //     Serial.println(WiFi.SSID(i).c_str());
    //   }
    // }
    memcpy(peerInfo.peer_addr, peerAddress, 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;
    peerInfo.ifidx = WIFI_IF_STA;
    if (esp_now_add_peer(&peerInfo) != ESP_OK)
    {
        Serial.println("Failed to add peer");
        return;
    }
    else
    {
        Serial.println("Added peer");
    Serial.println(WiFi.channel());
        return;
    }
}

void loop()
{
    if (mqtt.connected() == false)
    {
        Serial.print("MQTT connection... ");
        if (mqtt.connect(MQTT_NAME, MQTT_USERNAME, MQTT_PASSWORD))
        {
            Serial.println("connected");
            mqtt.subscribe(MQTT_SUBSCRIBE_TOPIC);
        }
        else
        {
            Serial.println("failed");
            delay(5000);
        }
    }
    else
    {
        mqtt.loop();
    }
}