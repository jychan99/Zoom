import http from "http";
import express from "express";
import WebSocket from "ws";
import { parse } from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public",express.static(__dirname+"/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

function onSocketClose(){
    console.log("Disonnected to Browser ❌");
}

const sockets = [];

const handleListen = () => console.log(`Listening on http://localhost:3000`);
const handleConnection = (socket) =>{
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close",onSocketClose);
    socket.on("message",(msg) => {
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message" : 
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${message.payload }`));
            case "nickName" : 
                socket["nickname"] = message.payload;
        }
    });
};

wss.on("connection",handleConnection);
server.listen(3000,handleListen);