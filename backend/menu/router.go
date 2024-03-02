// Create CRUD fiber function routes for menu

package menu

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MenuRouter struct {
	menuCol *mongo.Collection
}

func NewMenuRouter(a *fiber.App, menuCol *mongo.Collection) {
	router := &MenuRouter{
		menuCol: menuCol,
	}

	grp := a.Group("/menus")

	s := "/:board"

	grp.Post(s, router.CreateMenu)
	grp.Get(s, router.GetMenus)
}

func (r *MenuRouter) CreateMenu(c *fiber.Ctx) error {
	body := new(MenuModel)
	if err := c.BodyParser(body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	uid := c.Params("board")

	body.ID = primitive.NewObjectID()
	body.BoardId = uid
	msg, err := r.menuCol.InsertOne(c.Context(), body)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(msg)
}

func (r *MenuRouter) GetMenus(c *fiber.Ctx) error {
	cur, err := r.menuCol.Find(c.Context(), bson.D{{
		"board_id", c.Params("board"),
	}})
	docs := new([]MenuModel)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	if err = cur.All(c.Context(), docs); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(docs)
}
