package msg

import "go.mongodb.org/mongo-driver/bson/primitive"

type MsgModel struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Msg       string             `json:"msg" bson:"msg"`
	CreatedBy string             `json:"createdBy" bson:"created_by"`
	BoardTo   primitive.ObjectID `json:"sendTo" bson:"send_to"`
}
