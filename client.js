const socket=io("http://localhost:3000");
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var audio= new Audio("mp3.mp3");
var audio2=new Audio("mp2.mp3");

const append=(message,position)=>{
  const ele= document.createElement("div");
  ele.innerText=message;
  ele.classList.add('message');
  ele.classList.add(position);
  messageContainer.append(ele);

  if(position==="right"){
    audio.play();
  }else {
    audio2.play();
   }
}


const name=prompt("enter your name to join");
socket.emit('new-user-joined',name)


socket.on('user-joined',name=>{
  append(`${name} joined the chat`,'left')
})

socket.on('recieve',data=>{
  append(`${data.name}: \n${data.message}`,'left')
})

socket.on('left',name=>{
  append(`${name} left the chat`,'left');
})

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageInput.value;
  append(`You:\n ${message}`,'right')
  socket.emit('send',message)
  messageInput.value='';
})

document.getElementById('delay').addEventListener("click",function(e){
  e.preventDefault();

  const time=prompt("enter the time when to send the message in the format yyyy-mm-dd hh:mm:ss")
  const message=messageInput.value;
  messageInput.value='';
  date=new Date(time);
  now =new Date();

  let timeto=date-now;
  console.log(timeto);
  if(timeto>=0){
    setTimeout(()=>{
      append(`You:\n ${message}`,'right')
      socket.emit('send',message)
    },timeto)
  }

})
