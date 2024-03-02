package menu

import "go.mongodb.org/mongo-driver/bson/primitive"

type MenuModel struct {
	ID      primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Msg     string             `json:"msg" bson:"msg"`
	BoardId string             `json:"boardId" bson:"board_id"`
}

type EditMenuModel struct {
	Menus   []string `json:"menus"`
	BoardId string   `json:"boardId"`
}
