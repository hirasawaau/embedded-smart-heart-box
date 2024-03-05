<h1 id="smart-heart-box">Smart Heart Box</h1>
<p align="center">
<img width="608" alt="boxes" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/boxes.jpg">
</p>

<h2 id="-">ผู้จัดทำ</h2>
<ol>
<li>ศิลา สนปี <a href="https://github.com/hirasawaau">(Sila Sonpee)</a></li>
<li>ศุภวิชญ์ เสรีพาณิชย์การ <a href="https://github.com/karnse">(Supawit Seripanitkarn)</a></li>
<li>แพรเพชร ต่อไพบูลย์ <a href="https://github.com/PraepechPrAe">(Praepech Tophaiboon)</a></li>
<li>สิทธิพล เหล่าวิวัฒน์เกษม <a href="https://github.com/Linwoo1012">(Sittipol Laowiwatkasem)</a></li>
</ol>
<h2 id="-">รายละเอียดโครงการ</h2>
<p>Smart Heart Box ประกอบไปด้วยกล่องอัจฉริยะจำนวน 1 คู่ (2 กล่อง) เป็นอุปกรณ์ที่มีความสามารถในการเชื่อมต่อกันเองและเชื่อมต่อกับเว็บแอปพลิเคชั่น ซึ่งมุ่งเน้นให้ผู้ใช้สามารถสื่อสารความรักและความห่วงใยไปยังคนที่พวกเขารักผ่านทางข้อความได้อย่างไร้ขีดจำกัด</p>
<h2 id="-">ที่มาและความสำคัญ</h2>
<p>Smart Heart Box เป็นโครงงานที่มีกำหนดการและแรงจูงใจมาจากความต้องการในการสร้างช่องทางสื่อสารและแสดงความรักที่ไม่มีขีดจำกัดระหว่างคน โดยเฉพาะในยุคที่เทคโนโลยีเป็นส่วนสำคัญของชีวิตประจำวัน โครงงานนี้มุ่งเน้นที่การสร้างความใกล้ชิดและความสัมพันธ์ที่แข็งแรงอย่างยั่งยืน การสื่อสารและแสดงความรักผ่าน &quot;Smart Heart Box&quot; มีความสำคัญอย่างมากในการสร้างประสบการณ์ที่ดีและสนับสนุนความสุขของผู้ใช้ทั้งสองฝ่ายโดยไม่ว่าจะอยู่ห่างกันแค่ไหนก็ตาม และสะท้อนถึงความสำคัญของการใช้เทคโนโลยีในการสร้างความเชื่อมโยงและความรักที่แท้จริงในสังคมปัจจุบันได้อย่างมีความสำคัญและมีคุณค่าอย่างแท้จริง</p>
<h2 id="-">คุณสมบัติ</h2>
<ul>
<li>ส่งข้อความหาคนที่คุณรักผ่านข้อความพื้นฐานภายในกล่อง ไปแสดงผลบนหน้าจอของอีกฝ่าย</li>
<li>เมื่อมีข้อความเข้ามาหัวใจที่อยู่หน้ากล่องจะสั่น และจะหยุดสั่นเมื่อเจ้าของเปิดฝากล่องเพื่ออ่านข้อความ</li>
<li>ส่งข้อความหาคนที่คุณรักผ่านเว็บแอปพลิเคชันไปแสดงผลบนหน้าจอของ Smart Heart Box</li>
<li>สามารถปรับแก้และตั้งชุดข้อความพื้นฐานผ่านเว็บแอปพลิเคชันได้ เพื่อให้สามารถเลือกส่งข้อความจาก Smart Heart Box ของตนไปหาคนที่รักได้อย่างง่ายดาย</li>
</ul>
<h2 id="-">แนวคิดและหลักการ</h2>
<p align="center">
<img width="608" alt="SmartHeart_Diagram drawio-4" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/SmartHeart_Diagram.drawio-4.png">

<h3> แผนผังวงจร (Smart Heart Box 2 กล่อง)</h3>

<p align="center">
<div style="display: flex; justify-content: space-between;">
<p>
<img width="400" alt="Screenshot 2567-03-02 at 22 53 55" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/Screenshot 2567-03-02 at 22.53.55.png" style="margin-right:10px;" /><br></p><p><img width="400" alt="Screenshot 2567-03-02 at 22 53 55" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/Screenshot 2567-03-02 at 22.53.55.png" /></p>
</p>
</div>

<h3 id="-">เว็บแอปพลิเคชั่น</h3>
<p align="center">
<img width="608" alt="1" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/1.png">
<img width="608" alt="2" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/2.png">
</p>

<h3 id="smart-heart-box-no-1">Smart Heart Box No.1</h3>
<p align="center">
<img width="608" alt="box1" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/box1.jpg">
</p>

<h4 id="-1-mqtt-2">บอร์ดที่ 1 สำหรับรับข้อความจาก MQTT และส่งข้อความไปบอร์ดที่ 2</h4>
<p align="center">
<img width="608" alt="Box1" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/Box1.png">
</p>
ประกอบด้วยอุปกรณ์ดังนี้
<ul>
<li> ESP32</li>
<li>LDR</li>
<li>SG90 Micro Servo</li>
<li>Resistor 10k</li>
<li>Breadboard</li>
<li>Power Bank</li>
</ul>

การทำงานของบอร์ดที่ 1 มีดังนี้

- รับข้อมูลจากการ subcribe จาก MQTT Broker
- แสดงผลเมื่อ MQTT มีข้อมูลเข้ามา จะมีการเปลี่ยนแปลง ดังนี้
  - <strong>SG90 Micro Servo</strong> ทำการสั่นหัวใจ เพื่อแสดงให้เห็นว่ามีข้อความเข้ามา
  - <strong>LDR</strong> ทำการวัดความเข้มแสง เพื่อเช็คว่ามีการเปิดฝากล่องหรือไม่ หากมีการเปิดกล่อง จะทำการหยุดการสั่นของหัวใจ
- ส่ง message ไปยัง ESP32 อีกตัวภายในกล่องเดียวกัน ด้วย ESP-NOW

<h4> บอร์ดที่ 2 สำหรับแสดงผลและส่ง default message ไป Smart Heart Box อีกกล่องหนึ่ง</h4>

<p align="center">
<img width="608" alt="Box1 (2)" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/Box1 (2).png">
</p>
ประกอบด้วยอุปกรณ์ดังนี้

- NodeMCU ESP32
- Push Button
- LCD 16x2
- Breadboard
- Power Bank

การทำงานของบอร์ดที่ 2 มีดังนี้

- รับข้อมูลจากบอร์ดที่ 1 ด้วย ESP-NOW จะแสดงผลบนหน้าจอ LCD 16x2 และเมื่อกดปุ่มด้านขวา (ปุ่ม OK) จะทำการ dequeue ข้อความที่อยู่ใน queue
- รับ message จาก API เพื่อเปลี่ยนแปลง default message ที่จะส่งไปยังอีกกล่องหนึ่ง
- หากไม่มีข้อความที่อยู่ใน queue จะสามารถส่ง Default message ที่ถูกตั้งไว้ได้
  - <strong>ปุ่มด้านซ้าย (ปุ่ม Next)</strong> เลือก default message ข้อความอื่น (มีทั้งหมด 3 ข้อความ)
  - <strong>ปุ่มด้านขวา (ปุ่ม OK)</strong> ยืนยันการเลือกข้อความ และทำการส่งข้อความไปยังอีกกล่องหนึ่ง

### Smart Heart Box No.2

<p align="center">
<img width="608" alt="box2" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/box2.jpg">
</p>

<h4 id="-3-mqtt-4">บอร์ดที่ 3 สำหรับรับข้อความจาก MQTT และส่งข้อความไปบอร์ดที่ 4</h4>
<p align="center">
<img width="608" alt="Box2" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/Box2.png">
</p>

<p>ประกอบด้วยอุปกรณ์ดังนี้</p>
<ul>
<li>NodeMCU ESP32</li>
<li>LDR</li>
<li>SG90 Micro Servo</li>
<li>Resistor 10k</li>
<li>Breadboard</li>
<li>Power Bank</li>
</ul>
<p>การทำงานของบอร์ดที่ 1 มีดังนี้</p>
<ul>
<li>รับข้อมูลจากการ subcribe จาก MQTT Broker</li>
<li>แสดงผลเมื่อ MQTT มีข้อมูลเข้ามา จะมีการเปลี่ยนแปลง ดังนี้<ul>
<li><strong>SG90 Micro Servo</strong> ทำการสั่นหัวใจ เพื่อแสดงให้เห็นว่ามีข้อความเข้ามา</li>
<li><strong>LDR</strong> ทำการวัดความเข้มแสง เพื่อเช็คว่ามีการเปิดฝากล่องหรือไม่ หากมีการเปิดกล่อง จะทำการหยุดการสั่นของหัวใจ</li>
</ul>
</li>
<li>ส่ง message ไปยัง ESP32 อีกตัวภายในกล่องเดียวกัน ด้วย ESP-NOW</li>
</ul>
<h4 id="-4-default-message-smart-heart-box-">บอร์ดที่ 4 สำหรับแสดงผลและส่ง default message ไป Smart Heart Box อีกกล่องหนึ่ง</h4>
<p><p align="center">
<img width="608" alt="Box2 (2)" src="https://raw.githubusercontent.com/hirasawaau/embedded-smart-heart-box/main/pictures/Box2 (2).png">
</p>
ประกอบด้วยอุปกรณ์ดังนี้</p>
<ul>
<li>NodeMCU ESP32</li>
<li>Push Button</li>
<li>LCD 16x2</li>
<li>Breadboard</li>
<li>Power Bank</li>
</ul>
<p>การทำงานของบอร์ดที่ 2 มีดังนี้</p>
<ul>
<li>รับข้อมูลจากบอร์ดที่ 1 ด้วย ESP-NOW จะแสดงผลบนหน้าจอ LCD 16x2 และเมื่อกดปุ่มด้านขวา (ปุ่ม OK) จะทำการ dequeue ข้อความที่อยู่ใน queue</li>
<li>รับ message จาก API เพื่อเปลี่ยนแปลง default message ที่จะส่งไปยังอีกกล่องหนึ่ง</li>
<li>หากไม่มีข้อความที่อยู่ใน queue จะสามารถส่ง Default message ที่ถูกตั้งไว้ได้<ul>
<li><strong>ปุ่มด้านซ้าย (ปุ่ม Next)</strong> เลือก default message ข้อความอื่น (มีทั้งหมด 3 ข้อความ)</li>
<li><strong>ปุ่มด้านขวา (ปุ่ม OK)</strong> ยืนยันการเลือกข้อความ และทำการส่งข้อความไปยังอีกกล่องหนึ่ง</li>
</ul>
</li>
</ul>
<h2 id="-">อุปกรณ์</h2>
<ul>
<li>NodeMCU ESP32 [จำนวน 4 ตัว]</li>
<li>Push Button [จำนวน 4 ตัว]</li>
<li>LCD 16x2 [จำนวน 2 ตัว]</li>
<li>LDR [จำนวน 2 ตัว]</li>
<li>SG90 Micro Servo [จำนวน 2 ตัว]</li>
<li>Breadboard 8.5x5.5cm [จำนวน 6 ตัว]</li>
<li>Resistor 10k [จำนวน 2 ตัว]</li>
<li>Power Bank [จำนวน 3 ตัว]</li>
</ul>
<h2 id="stack">Stack</h2>
<h3 id="hardware">Hardware</h3>
<h4 id="library">Library</h4>
<ul>
<li>บอร์ดสำหรับรับข้อความจาก MQTT และส่งข้อความไปอีกบอร์ดภายในกล่อง<ul>
<li>Arduino.h</li>
<li>WiFi.h</li>
<li>esp_now.h</li>
<li>ESP32PWM.h</li>
<li>ESP32Servo.h</li>
<li>PubSubClient.h</li>
</ul>
</li>
<li>บอร์ดสำหรับแสดงผลและส่ง default message ไป Smart Heart Box อีกกล่องหนึ่ง<ul>
<li>Arduino.h</li>
<li>Wire.h</li>
<li>LiquidCrystal_I2C.h</li>
<li>esp_now.h</li>
<li>WiFi.h</li>
<li>HTTPClient.h</li>
<li>ArduinoJson.h</li>
<li>PubSubClient.h</li>
</ul>
</li>
</ul>
<h3 id="design">Design</h3>
<ul>
<li>Figma</li>
<li>Wokwi</li>
</ul>
<h3 id="frontend">Frontend</h3>
<ul>
<li>React</li>
<li>Tailwind</li>
</ul>
<h3 id="backend">Backend</h3>
<ul>
<li>Golang</li>
<li>Fiber</li>
<li>MongoDB</li>
</ul>
<h3 id="message-broker">Message Broker</h3>
<ul>
<li>Mosquitto MQTT Broker</li>
</ul>
