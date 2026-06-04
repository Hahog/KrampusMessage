/*package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Client struct {
	conn *websocket.Conn
	send chan []byte
	id   string // ✅ адрес отправителя
}

type Hub struct {
	clients   map[*websocket.Conn]*Client
	broadcast chan ClientMessage
	mutex     sync.RWMutex
}

type ClientMessage struct {
	Data   []byte
	Sender string // ✅ адрес отправителя
}

type checkActiveUser struct {
	Type  string `json:"type"`
	Id    string `json:"id"`
	Count int    `json:"count"`
}

var hub = &Hub{
	clients:   make(map[*websocket.Conn]*Client),
	broadcast: make(chan ClientMessage, 256),
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func (h *Hub) run() {
	for msg := range h.broadcast {
		h.mutex.RLock()
		for _, client := range h.clients {
			// ✅ ИСКЛЮЧАЕМ отправителя
			if client.id != msg.Sender {
				select {
				case client.send <- msg.Data:
				default:
					fmt.Println("⚠️ Клиент не читает")
				}
			}
		}
		h.mutex.RUnlock()
	}
}

func main() {
	go hub.run()

	r := gin.Default()
	r.GET("/ws/:idRoom/:typeWS", func(c *gin.Context) {
		userID := c.Param("idRoom")
		typeWS := c.Param("typeWS")
		wsHandler(c, userID, typeWS)
	})

	fmt.Println("🚀 ws://localhost:8080/ws")
	r.Run(":8080")
}

func wsHandler(c *gin.Context, idRoom string, typeWS string) {
	fmt.Println(idRoom)

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	addr := conn.RemoteAddr().String()
	client := &Client{
		conn: conn,
		send: make(chan []byte, 256),
		id:   addr, // ✅ сохраняем адрес
	}

	hub.mutex.Lock()
	hub.clients[conn] = client
	hub.mutex.Unlock()
	if typeWS == "call" {
		_, msg, err := conn.ReadMessage()

		if err != nil {
			fmt.Printf("💥 Read error %s: %v\n", client.id, err)
			// ✅ Удаляем клиента из хаба
			hub.mutex.Lock()
			delete(hub.clients, conn)
			hub.mutex.Unlock()
			return
		}

		var structure checkActiveUser

		structureErr := json.Unmarshal(msg, &structure)
		if structureErr == nil && structure.Type == "checkCountUserCall" {
			structure.Count = len(hub.clients)
			for _, client := range hub.clients {
				fmt.Println(client.conn)
			}
			jsonData, err := json.Marshal(structure)
			if err != nil {

			}
			client.conn.WriteMessage(websocket.TextMessage, jsonData)
		}
	}

	fmt.Printf("🔗 Подключен %s. Всего: %d\n", addr, len(hub.clients))

	go readPump(conn, client)
	go writePump(client)
}

func readPump(conn *websocket.Conn, client *Client) {
	defer conn.Close()

	conn.SetReadLimit(512 * 1024)
	conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Printf("💥 Read error %s: %v\n", client.id, err)
			// ✅ Удаляем клиента из хаба
			hub.mutex.Lock()
			delete(hub.clients, conn)
			hub.mutex.Unlock()
			break
		}

		fmt.Printf("📨 [%s] %s\n", client.id, string(msg))
		hub.broadcast <- ClientMessage{
			Data:   msg,
			Sender: client.id, // ✅ передаём адрес отправителя
		}
	}
}

func writePump(client *Client) {
	defer client.conn.Close()

	ticker := time.NewTicker(50 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case msg, ok := <-client.send:
			client.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				client.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := client.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				fmt.Printf("Write error %s: %v\n", client.id, err)
				return
			}

		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}*/

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Client struct {
	conn   *websocket.Conn
	send   chan []byte
	id     string
	room   string
	isCall bool
}

var (
	upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
	rooms    = make(map[string]map[*Client]bool) // комната -> множество клиентов
)

// Добавить/удалить клиента
func addClient(c *Client) {
	if rooms[c.room] == nil {
		rooms[c.room] = make(map[*Client]bool)
	}
	rooms[c.room][c] = true
}

func removeClient(c *Client) {
	if clients, ok := rooms[c.room]; ok {
		delete(clients, c)
		if len(clients) == 0 {
			delete(rooms, c.room)
		}
	}
	close(c.send)
}

// Количество call-клиентов в комнате (исключая опционально переданного)
func callCount(room string, exclude *Client) int {
	clients := rooms[room]
	if clients == nil {
		return 0
	}
	count := 0
	for c := range clients {
		if c.isCall && c != exclude {
			count++
		}
	}
	return count
}

// Рассылка всем call-клиентам в комнате, кроме отправителя
func broadcast(room string, data []byte, sender *Client) {
	for c := range rooms[room] {
		if c != sender {
			select {
			case c.send <- data:
			default:
			}
		}
	}
}

func wsHandler(c *gin.Context) {
	room := c.Param("idRoom")
	typeWS := c.Param("typeWS")
	isCall := typeWS == "call"

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{
		conn:   conn,
		send:   make(chan []byte, 256),
		id:     conn.RemoteAddr().String(),
		room:   room,
		isCall: isCall,
	}

	// Для call: сначала ответить количеством уже подключённых (без себя)
	if isCall {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			conn.Close()
			return
		}
		var req struct{ Type string }
		if json.Unmarshal(msg, &req) == nil && req.Type == "checkCountUserCall" {
			count := callCount(room, nil)
			resp, _ := json.Marshal(map[string]interface{}{
				"type":  "checkCountUserCall",
				"count": count,
			})
			conn.WriteMessage(websocket.TextMessage, resp)
		}
	}

	// Теперь добавляем клиента
	addClient(client)
	fmt.Printf("✅ %s в комнате %s (call=%v). Всего call: %d\n",
		client.id, room, isCall, callCount(room, nil))

	// Запуск чтения и записи
	go readPump(client)
	go writePump(client)
}

func readPump(c *Client) {
	defer func() {
		c.conn.Close()
		removeClient(c)
	}()
	for {
		_, msg, err := c.conn.ReadMessage()
		fmt.Println(string(msg))
		if err != nil {
			break
		}
		broadcast(c.room, msg, c)
	}
}

func writePump(c *Client) {
	ticker := time.NewTicker(50 * time.Second)
	defer ticker.Stop()
	for {
		select {
		case msg, ok := <-c.send:
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, nil)
				return
			}
			c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			c.conn.WriteMessage(websocket.TextMessage, msg)
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func main() {
	r := gin.Default()
	r.GET("/ws/:idRoom/:typeWS", wsHandler)
	fmt.Println("🚀 http://localhost:8080/ws/:idRoom/:typeWS")
	r.Run(":8080")
}
