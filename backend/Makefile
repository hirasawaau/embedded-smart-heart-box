.PHONY: build run dev

build:
	go build -o main .

dev:
	MONGO_URI=mongodb://localhost:27017 \
	MQTT_HOST=localhost \
	MQTT_PORT=1883 \
	MQTT_CLIENT_ID=go-mqtt-client \
	MQTT_USERNAME=jinn \
	MQTT_PASSWORD=jinn \
	air

run:
	./main