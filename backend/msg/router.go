package msg

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MsgRouter struct {
	msgCol *mongo.Collection
}

func NewMsgRouter(a *fiber.App, msgCol *mongo.Collection) {
	router := &MsgRouter{
		msgCol: msgCol,
	}

	grp := a.Group("/msg")

	grp.Post("/", router.CreateMsg)
	grp.Get("/", router.GetMsgs)
}

func (r *MsgRouter) CreateMsg(c *fiber.Ctx) error {
	body := new(MsgModel)
	if err := c.BodyParser(body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	body.ID = primitive.NewObjectID()
	msg, err := r.msgCol.InsertOne(c.Context(), body)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(msg)
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
