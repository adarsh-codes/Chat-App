

import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);
const io = new Server(server,{
   cors:{
    origin:"http://localhost:5500"
   }
})

app.use(cors());

const users = {};



io.on('connection',socket=>{
    socket.on('new-user-joined',name =>{
        console.log('name',name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',mess=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })
});


server.listen(8000,()=>{
    console.log("running on 8000")
})


