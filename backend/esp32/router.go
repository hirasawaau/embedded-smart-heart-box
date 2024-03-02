package esp32

import (
	"context"

	"github.com/gofiber/fiber/v2"
	mqtt "github.com/hirasawaau/embedded-smart-heart-box/backend/mqtt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ESP32Router struct {
	esp32Col    *mongo.Collection
	mqttService *mqtt.MqttService
}

func NewESP32Router(a *fiber.App, esp32Col *mongo.Collection) {
	if _, err := esp32Col.Indexes().CreateOne(context.TODO(), mongo.IndexModel{
		Keys: bson.D{{"uid", 1}},
	}); err != nil {
		panic(err)
	}
	router := &ESP32Router{
		esp32Col: esp32Col,
	}

	grp := a.Group("/esp32")

	grp.Post("/", router.CreateESP32)
	grp.Get("/", router.GetESP32s)
}

func (r *ESP32Router) CreateESP32(c *fiber.Ctx) error {
	body := new(ESP32Model)
	if err := c.BodyParser(body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	msg, err := r.esp32Col.InsertOne(c.Context(), body)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(msg)
}

func (r *ESP32Router) GetESP32s(c *fiber.Ctx) error {
	cur, err := r.esp32Col.Find(c.Context(), bson.D{})
	docs := new([]ESP32Model)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	if err = cur.All(c.Context(), docs); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(docs)
}
