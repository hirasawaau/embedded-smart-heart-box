package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"strconv"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const TOPIC string = "esp32/4b3g55"

var messagePublishHandler mqtt.MessageHandler = func(c mqtt.Client, m mqtt.Message) {
	log.Printf("Received message: %s from topic: %s\n", m.Payload(), m.Topic())
}

func main() {
	brokerHost := os.Getenv("MQTT_HOST")
	brokerPort, err := strconv.ParseUint(os.Getenv("MQTT_PORT"), 10, 16)
	if err != nil {
		panic(err)
	}
	brokerClientId := os.Getenv("MQTT_CLIENT_ID")
	brokerUsername := os.Getenv("MQTT_USERNAME")
	brokerPassword := os.Getenv("MQTT_PASSWORD")

	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("tcp://%s:%d", brokerHost, brokerPort))
	opts.SetClientID(brokerClientId)
	opts.SetUsername(brokerUsername)
	opts.SetPassword(brokerPassword)
	opts.OnConnect = func(c mqtt.Client) {
		log.Println("Connected to broker")
	}

	client := mqtt.NewClient(opts)

	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	if token := client.Subscribe(TOPIC, 0, messagePublishHandler); token.Wait() && token.Error() != nil {
		panic(fmt.Sprintf("Error subscribing to topic: %s", token.Error()))
	}

	log.Println("Subscriber is running on topic: ", TOPIC)

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	<-sigChan

	client.Unsubscribe(TOPIC)
	client.Disconnect(250)

}
