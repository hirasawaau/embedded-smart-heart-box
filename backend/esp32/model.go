package esp32

import "go.mongodb.org/mongo-driver/bson/primitive"

type ESP32Model struct {
	ID   primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name string             `json:"name" bson:"name"`
}
