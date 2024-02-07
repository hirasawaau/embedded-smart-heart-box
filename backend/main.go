package main

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	esp32 "github.com/hirasawaau/embedded-smart-heart-box/backend/esp32"
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

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}

	defer disConnectMongo(client)

	msg.NewMsgRouter(app, client.Database("smartheart").Collection("msg"))
	esp32.NewESP32Router(app, client.Database("smartheart").Collection("esp32"))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello, World!",
		})
	})

	app.Listen(":3000")
}
