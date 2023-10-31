const socket = io();  

const welcome = document.getElementById("welcome");
const nickNameForm = welcome.querySelector("#nickname");
const enterRoomForm = welcome.querySelector("#enterroom");
const room = document.getElementById("room");
const sendMessageForm = welcome.querySelector("#msg");

room.hidden=true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");

    li.innerText = message;
    ul.append(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message",input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value="";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = welcome.querySelector("#nickname input");
    const value = input.value;
    socket.emit("nickname",value);
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    //const nickNameForm = room.querySelector("#nickname");
    msgForm.addEventListener("submit",handleMessageSubmit);
    //nickNameForm.addEventListener("submit",handleNicknameSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = enterRoomForm.querySelector("input");
    socket.emit("enter_room", input.value,showRoom);
    roomName = input.value;
    input.value="";
}


enterRoomForm.addEventListener("submit",handleRoomSubmit);
nickNameForm.addEventListener("submit",handleNicknameSubmit);

socket.on("welcome",(user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} joined!`);
});

socket.on("bye",(user, newCount) =>{
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} left.`);
});

socket.on("new_message", addMessage);

socket.on("room_change",(rooms)=>{
    if(rooms.length === 0){
        roomList.innerHTML = "";
        return;
    }
    const roomList = welcome.querySelector("ul");
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
});