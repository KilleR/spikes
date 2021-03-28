package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"image/png"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

type Bag struct {
	GUID      string `json:"GUID"`
	Name      string `json:"Name"`
	Transform struct {
		Posx   float64 `json:"posX"`
		Posy   float64 `json:"posY"`
		Posz   float64 `json:"posZ"`
		Rotx   float64 `json:"rotX"`
		Roty   float64 `json:"rotY"`
		Rotz   float64 `json:"rotZ"`
		Scalex float64 `json:"scaleX"`
		Scaley float64 `json:"scaleY"`
		Scalez float64 `json:"scaleZ"`
	} `json:"Transform"`
	Nickname     string `json:"Nickname"`
	Description  string `json:"Description"`
	Gmnotes      string `json:"GMNotes"`
	Colordiffuse struct {
		R float64 `json:"r"`
		G float64 `json:"g"`
		B float64 `json:"b"`
	} `json:"ColorDiffuse"`
	Layoutgroupsortindex int  `json:"LayoutGroupSortIndex"`
	Locked               bool `json:"Locked"`
	Grid                 bool `json:"Grid"`
	Snap                 bool `json:"Snap"`
	Ignorefow            bool `json:"IgnoreFoW"`
	Measuremovement      bool `json:"MeasureMovement"`
	Dragselectable       bool `json:"DragSelectable"`
	Autoraise            bool `json:"Autoraise"`
	Sticky               bool `json:"Sticky"`
	Tooltip              bool `json:"Tooltip"`
	Gridprojection       bool `json:"GridProjection"`
	Hidewhenfacedown     bool `json:"HideWhenFaceDown"`
	Hands                bool `json:"Hands"`
	Materialindex        int  `json:"MaterialIndex"`
	Meshindex            int  `json:"MeshIndex"`
	Bag                  struct {
		Order int `json:"Order"`
	} `json:"Bag"`
	Luascript        string            `json:"LuaScript"`
	Luascriptstate   string            `json:"LuaScriptState"`
	Xmlui            string            `json:"XmlUI"`
	Containedobjects []ContainedObject `json:"ContainedObjects"`
}

type ContainedObject struct {
	//GUID      string `json:"GUID"`
	Name      string `json:"Name"`
	Transform struct {
		Posx   float64 `json:"posX"`
		Posy   float64 `json:"posY"`
		Posz   float64 `json:"posZ"`
		Rotx   float64 `json:"rotX"`
		Roty   float64 `json:"rotY"`
		Rotz   float64 `json:"rotZ"`
		Scalex float64 `json:"scaleX"`
		Scaley float64 `json:"scaleY"`
		Scalez float64 `json:"scaleZ"`
	} `json:"Transform"`
	Nickname     string `json:"Nickname"`
	Description  string `json:"Description"`
	Gmnotes      string `json:"GMNotes"`
	Colordiffuse struct {
		R float64 `json:"r"`
		G float64 `json:"g"`
		B float64 `json:"b"`
	} `json:"ColorDiffuse"`
	Layoutgroupsortindex int  `json:"LayoutGroupSortIndex"`
	Locked               bool `json:"Locked"`
	Grid                 bool `json:"Grid"`
	Snap                 bool `json:"Snap"`
	Ignorefow            bool `json:"IgnoreFoW"`
	Measuremovement      bool `json:"MeasureMovement"`
	Dragselectable       bool `json:"DragSelectable"`
	Autoraise            bool `json:"Autoraise"`
	Sticky               bool `json:"Sticky"`
	Tooltip              bool `json:"Tooltip"`
	Gridprojection       bool `json:"GridProjection"`
	Hidewhenfacedown     bool `json:"HideWhenFaceDown"`
	Hands                bool `json:"Hands"`
	Customimage          struct {
		Imageurl          string  `json:"ImageURL"`
		Imagesecondaryurl string  `json:"ImageSecondaryURL"`
		Imagescalar       float64 `json:"ImageScalar"`
		Widthscale        float64 `json:"WidthScale"`
		Customtile        struct {
			Type      int     `json:"Type"`
			Thickness float64 `json:"Thickness"`
			Stackable bool    `json:"Stackable"`
			Stretch   bool    `json:"Stretch"`
		} `json:"CustomTile"`
	} `json:"CustomImage"`
	Luascript      string `json:"LuaScript"`
	Luascriptstate string `json:"LuaScriptState"`
	Xmlui          string `json:"XmlUI"`
}

func doFileUpload() {
	token := "Bearer " + os.Getenv("API_TOKEN")

	client := &http.Client{}
	client.CheckRedirect = func(req *http.Request, via []*http.Request) error {
		for key, val := range via[0].Header {
			req.Header[key] = val
		}
		return nil
	}

	imageFiles, err := ioutil.ReadDir("assets/images")
	if err != nil {
		log.Fatalln("Failed to open image directory:", err)
	}
	for _, imageFile := range imageFiles {
		uploadContents, err := ioutil.ReadFile("assets/images/" + imageFile.Name())
		if err != nil {
			log.Fatalln("Failed to read image file:", err)
		}

		req, err := http.NewRequest("POST", "http://api.api-it.io/dirt-wars/"+imageFile.Name(), bytes.NewReader(uploadContents))
		if err != nil {
			log.Fatalln("Failed to open Upload request:", err)
		}
		req.Header.Add("Authorization", token)
		req.Header.Add("content-type", "image/png")

		resp, err := client.Do(req)
		if err != nil {
			log.Fatalln("Failed to send Upload request:", err)
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		fmt.Println(string(body))
	}
}

func handleBinaryImage() {
	oldImg, err := ioutil.ReadFile("assets/binary.png")
	if err != nil {
		log.Fatalln("failed to open image", err)
	}

	newImage, err := png.Decode(bytes.NewReader(oldImg))
	if err != nil {
		log.Fatalln("failed to decode image", err)
	}

	fmt.Println(newImage)
}

func main() {
	//handleBinaryImage()
	//return

	//doFileUpload()

	//return
	imageFile, err := ioutil.ReadFile("assets/imageHost")
	if err != nil {
		log.Fatalln("Failed to open image file:", err)
	}

	imageLines := strings.Split(string(imageFile), "\r\n")
	fmt.Println(imageLines)

	unitFile, err := ioutil.ReadFile("assets/dirt_wars_1.txt")
	if err != nil {
		log.Fatalln("Failed to open input:", err)
	}

	unitLines := strings.Split(string(unitFile), "\r\n")[2:]
	fmt.Println(unitLines)

	bagFile, err := ioutil.ReadFile("assets/bag_ex.json")
	if err != nil {
		log.Fatalln("Failed to open input:", err)
	}

	var myBag Bag
	err = json.Unmarshal(bagFile, &myBag)
	if err != nil {
		log.Fatalln("Failed to unmarshal bag file:", err)
	}

	fmt.Println(myBag)

	//unitClone := myBag.Containedobjects[0]

	var newContainedObjects []ContainedObject

	for i, unitLine := range unitLines {
		unitParts := strings.Split(unitLine, ",")
		fmt.Println(unitParts)
		unit := myBag.Containedobjects[0]

		unit.Nickname = unitParts[3]
		unit.Customimage.Imageurl = imageLines[i]

		newContainedObjects = append(newContainedObjects, unit)
	}

	myBag.Containedobjects = newContainedObjects

	outBytes, err := json.MarshalIndent(myBag, "", "  ")
	if err != nil {
		log.Fatalln("Failed to marshal bag file:", err)
	}
	err = ioutil.WriteFile("assets/newBag.json", outBytes, 0644)
	if err != nil {
		log.Fatalln("Failed to write bag file:", err)
	}
}
