package mqtt

import (
	"fmt"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type MqttService struct {
	client mqtt.Client
}

var messagePublishHandler mqtt.MessageHandler = func(c mqtt.Client, m mqtt.Message) {
	fmt.Printf("Received message: %s from topic: %s\n", m.Payload(), m.Topic())
}

var connectHandler mqtt.OnConnectHandler = func(c mqtt.Client) {
	fmt.Printf("Connected")
}

var connectionLostHandler mqtt.ConnectionLostHandler = func(c mqtt.Client, err error) {
	fmt.Printf("Connection lost: %s", err.Error())
}

func NewMqttService(broker string, clientId string, username string, password string) *MqttService {
	opts := mqtt.NewClientOptions()
	opts.AddBroker(broker)
	opts.SetClientID(clientId)
	opts.SetUsername(username)
	opts.SetPassword(password)
	opts.SetDefaultPublishHandler(messagePublishHandler)
	opts.OnConnect = connectHandler
	opts.OnConnectionLost = connectionLostHandler
	client := mqtt.NewClient(opts)
	client.Connect()
	return &MqttService{
		client: client,
	}
}

func (s *MqttService) Publish(topic string, qos byte, retained bool, payload interface{}) {
	t := s.client.Publish(topic, qos, retained, payload)
	t.Wait()
}

func (s *MqttService) Disconnect() {
	s.client.Disconnect(250)
}
