// Create CRUD fiber function routes for menu

package menu

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

	grp.Put(s, router.EditMenus)
	grp.Get(s, router.GetMenus)
	grp.Post(s, router.ReplaceMenus)
}

func (r *MenuRouter) ReplaceMenus(c *fiber.Ctx) error {
	board := c.Params("board")
	_, err := r.menuCol.DeleteMany(c.Context(), bson.D{{"board_id", board}})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	for i := 0; i < 3; i++ {
		_, err = r.menuCol.InsertOne(c.Context(), MenuModel{
			ID:      primitive.NewObjectID(),
			Msg:     fmt.Sprintf("Menu %d", i+1),
			BoardId: board,
		})
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
	}
	return c.JSON(fiber.Map{"msg": "ok"})
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

func (r *MenuRouter) EditMenus(c *fiber.Ctx) error {
	body := new(EditMenuModel)
	if err := c.BodyParser(body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if len(body.Menus) != 3 {
		return c.Status(400).JSON(fiber.Map{"error": "Menus must be 3"})
	}
	findOpt := new(options.FindOptions)
	findOpt.SetLimit(3)
	cur, err := r.menuCol.Find(c.Context(), bson.D{
		{"board_id", c.Params("board")},
	}, findOpt)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	i := 0
	for cur.Next(c.Context()) {
		var result MenuModel
		err := cur.Decode(&result)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		result.Msg = body.Menus[i]
		i++

		res, err := r.menuCol.UpdateOne(c.Context(), bson.D{
			{"_id", result.ID},
		}, bson.D{{"$set", result}})
		fmt.Println(res)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
	}

	return c.JSON(fiber.Map{"msg": "ok"})
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
