
const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const input = document.getElementById('inp');
var audio = new Audio('/ting.mp3')
const messagecontainer = document.querySelector('.container')

const append = (message,position)=>{
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messagecontainer.append(messageElement);
        if(position == left) audio.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = input.value;
    socket.emit('send',message);
    input.value = '';
    append(`You : ${message}`,'right');
   
});

let n = prompt("Enter your name");


socket.emit('new-user-joined',n);



socket.on('user-joined',name=>{
    append(`${name} behen ka lund joined the chat`,'right');
});

socket.on('receive',message=>{
    append(`${message.name} : ${message.message}`,'left');
});

socket.on('leave',mess=>{
    append(`${mess} behen ka lund has left`,'left');
})