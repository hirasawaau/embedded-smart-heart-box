package esp32

type ESP32Model struct {
	UID  string `json:"uid" bson:"uid"`
	Name string `json:"name" bson:"name"`
}
