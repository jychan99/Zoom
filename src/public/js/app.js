const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const nickNameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

function handleOpen(){
    console.log("Connected to Server ✅");
}
function handleMessage(message){
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
}
function handleClose(){
    console.log("Disonnected to Server ❌");
}
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message",input.value)); 
    input.value=""; 
}
function handleNickSubmit(event){
    event.preventDefault();
    const input = nickNameForm.querySelector("input");
    socket.send(makeMessage("nickName",input.value));
}
function makeMessage(type,payload){
    const msg = {type,payload};
    return JSON.stringify(msg);
}



socket.addEventListener("open", handleOpen)
socket.addEventListener("message",handleMessage);
socket.addEventListener("close",handleClose);
messageForm.addEventListener("submit",handleSubmit);
nickNameForm.addEventListener("submit",handleNickSubmit);