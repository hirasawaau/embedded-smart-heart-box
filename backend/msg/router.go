package msg

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/hirasawaau/embedded-smart-heart-box/backend/mqtt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MsgRouter struct {
	msgCol      *mongo.Collection
	mqttService *mqtt.MqttService
}

func NewMsgRouter(a *fiber.App, msgCol *mongo.Collection, mqttService *mqtt.MqttService) {
	router := &MsgRouter{
		msgCol:      msgCol,
		mqttService: mqttService,
	}

	grp := a.Group("/msg")

	grp.Post("/", router.CreateMsg)
	grp.Get("/", router.GetMsgs)
}

func (r *MsgRouter) CreateMsg(c *fiber.Ctx) error {
	fmt.Println("Called")
	body := new(MsgModel)
	if err := c.BodyParser(body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	body.ID = primitive.NewObjectID()

	_, err := r.msgCol.InsertOne(c.Context(), body)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	r.mqttService.Publish(fmt.Sprintf("esp32/%s", body.BoardTo), 0, false, body.Msg)

	return c.JSON(body)
}

func (r *MsgRouter) GetMsgs(c *fiber.Ctx) error {
	cur, err := r.msgCol.Find(c.Context(), bson.D{})
	docs := new([]MsgModel)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	if err = cur.All(c.Context(), docs); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(docs)
}
