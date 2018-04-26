const io = require('./index.js').io;

module.exports = function(socket){

//   let newme = [];
//    newme.push(socket.id);

//   newme.forEach(function(element) {
//   console.log(element +"this is it");
// });

    // socket.on('load',function(){
    // 	console.log('this is loader running') // loader 
    // })

   

	socket.on('chat', function(input){
		console.log(input);
		io.sockets.emit('acknowledgement', ''+ input
			+' ');
	})
	console.log("Socket Id :"+ socket.id);

}
