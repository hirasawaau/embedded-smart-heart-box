package main

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	esp32 "github.com/hirasawaau/embedded-smart-heart-box/backend/esp32"
	"github.com/hirasawaau/embedded-smart-heart-box/backend/menu"
	mqtt "github.com/hirasawaau/embedded-smart-heart-box/backend/mqtt"
	msg "github.com/hirasawaau/embedded-smart-heart-box/backend/msg"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetEnvOrDefault(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func disConnectMongo(client *mongo.Client) {
	err := client.Disconnect(context.Background())
	if err != nil {
		panic(err)
	}
}
func main() {
	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowCredentials: true,
	}))

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	mongoUri := GetEnvOrDefault("MONGO_URI", "mongodb://localhost:27017")

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if err != nil {
		panic(err)
	}

	defer disConnectMongo(client)

	brokerHost := GetEnvOrDefault("MQTT_HOST", "localhost")
	brokerPortStr := GetEnvOrDefault("MQTT_PORT", "1883")
	brokerPort, err := strconv.ParseUint(brokerPortStr, 10, 16)
	if err != nil {
		panic(err)
	}
	brokerClientId := GetEnvOrDefault("MQTT_CLIENT_ID", "go-mqtt-backend")
	brokerUsername := GetEnvOrDefault("MQTT_USERNAME", "jinn")

	brokerPassword := GetEnvOrDefault("MQTT_PASSWORD", "jinn")

	mqttService := mqtt.NewMqttService(fmt.Sprintf("tcp://%s:%d", brokerHost, brokerPort), brokerClientId, brokerUsername, brokerPassword)
	defer mqttService.Disconnect()

	msg.NewMsgRouter(app, client.Database("smartheart").Collection("msg"), mqttService)
	esp32.NewESP32Router(app, client.Database("smartheart").Collection("esp32"))
	menu.NewMenuRouter(app, client.Database("smartheart").Collection("menu"))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello, World!",
		})
	})

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "4000"
	}

	app.Listen(fmt.Sprintf(":%s", PORT))
}
