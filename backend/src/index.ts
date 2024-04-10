import express, { Request, Response } from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import { Server } from "socket.io";
import { SocketService } from './Services/SocketService';




dotenv.config()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"


const app = express()
const httpServer = createServer()

const io = new Server(httpServer, {
	cors: {
		origin: CLIENT_URL
	}
})



httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT} Port`)
})


const socketService = new SocketService()


io.on("connection", (socket) => {

	socketService.initListners(socket)

	socket.on("code", (data: { roomId: string, code: string }) => {

		console.log('Receiving code ')
		console.log(data.roomId)
		console.log(data.code)


		io.emit("code-frontend", { code: data.code })

	})
})

