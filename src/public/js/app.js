const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

function handleOpen(){
    console.log("Connected to Server ✅");
}
function handleMessage(message){
    console.log("New message : ", message.data);
}
function handleClose(){
    console.log("Disonnected to Server ❌");
}
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value); 
    input.value=""; 
}





socket.addEventListener("open", handleOpen)
socket.addEventListener("message",handleMessage);
socket.addEventListener("close",handleClose);
messageForm.addEventListener("submit",handleSubmit);