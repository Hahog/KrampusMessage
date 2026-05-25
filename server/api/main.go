package main

import (
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
	r.GET("/ws/:idRoom", func(c *gin.Context) {
		userID := c.Param("idRoom")
		wsHandler(c, userID)
	})

	fmt.Println("🚀 ws://localhost:8080/ws")
	r.Run(":8080")
}

func wsHandler(c *gin.Context, idRoom string) {
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
				fmt.Printf("⚠️ Write error %s: %v\n", client.id, err)
				return
			}

		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
