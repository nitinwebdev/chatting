const path = require('path');
const express = require('express');
const appo = express();
var app = require('http').createServer(appo);
var io = module.exports.io = require('socket.io')(app)

const PORT =  process.env.PORT||3231;

appo.use(express.static(path.join(__dirname, '../../build')));

appo.get('/',(req, res, next) =>
res.sendFile(__dirname+ './index.html'));
	
const SocketManager = require('./SocketManager')
io.on('connection',SocketManager);
app.listen(PORT, () => {
 console.log(`connected to port ${PORT} hii Nitin`);
});