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

	mongoUri := os.Getenv("MONGO_URI")

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if err != nil {
		panic(err)
	}

	defer disConnectMongo(client)

	brokerHost := os.Getenv("MQTT_HOST")
	brokerPort, err := strconv.ParseUint(os.Getenv("MQTT_PORT"), 10, 16)
	if err != nil {
		panic(err)
	}
	brokerClientId := os.Getenv("MQTT_CLIENT_ID")
	brokerUsername := os.Getenv("MQTT_USERNAME")
	brokerPassword := os.Getenv("MQTT_PASSWORD")

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
